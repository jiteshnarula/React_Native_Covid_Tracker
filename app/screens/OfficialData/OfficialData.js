import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import AppText from '../../components/Form/AppText';
import Card from '../../components/Card';
import {
  getOfficialListings,
  getOfficialHistoryListings,
} from '../../api/officialListing';
import CustomTable from '../../components/CustomTable';
import {
  numberWithCommas,
  gettingTime,
  gettingDate,
} from '../../components/CommonFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import { Android_Add_Unit } from '../../contants/ads';
import AdMob from '../../components/AddMob';
import AppModal from '../../components/AppModal';
import { screenWidth } from '../../contants/widthandheight';

const OfficialData = ({ theme }) => {
  const [tableData, setTableData] = useState([]);
  const [listing, setListing] = useState([]);
  const [totalActiveCases, setTotalActiveCases] = useState('');
  const [totalDeaths, setTotalDeaths] = useState('');
  const [totalConfirmedCases, setTotalConfirmedCases] = useState('');
  const [totalRecoveredCases, setTotalRecoveredCases] = useState('');
  const [totalTestedCases, setTotalTestedCases] = useState('');
  const [lastUpdatedTimezone, setLastUpdatedTimezone] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showCatchModal, setShowCatchModal] = useState(false);

  const [
    todaysConfirmedCases,
    setTodaysConfirmedCases,
  ] = React.useState('');
  const [todaysDeathCases, setTodaysDeathCases] = React.useState('');
  const [
    todaysRecoveredCases,
    setTodaysRecoveredCases,
  ] = React.useState('');
  const [todaysDate, setTodaysDate] = React.useState('');

  const handleRefresh = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Please wait... List is getting refreshed',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    loadListing(false).then(() => {
      ToastAndroid.showWithGravityAndOffset(
        'Refresh done...',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    });
  };

  const tableHead = [
    'State/U.T.',
    'Active',
    'Confirmed',
    'Recovered',
    'Deaths',
  ];
  const widthArr = [140, 80, 80, 80, 80];
  useEffect(() => {
    loadListing(true);
  }, []);

  const loadListing = async mode => {
    let response;
    let historyResponse;
    try {
      if (mode) setLoading(true);
      response = await getOfficialListings();
      historyResponse = await getOfficialHistoryListings();

      if (mode) setLoading(false);
      setListing(response.data);
      const stateObj = response['data']['data']['regional'];
      const summaryObj = response['data']['data']['summary'];
      const tabData = [];
      if (response.data.success) {
        setTotalConfirmedCases(summaryObj['total']);
        setTotalRecoveredCases(summaryObj['discharged']);
        setTotalActiveCases(
          summaryObj['total'] -
            (summaryObj['discharged'] + summaryObj['deaths']),
        );
        setTotalDeaths(summaryObj['deaths']);
        setLastUpdatedTimezone(response['data']['lastOriginUpdate']);

        if (historyResponse['data']['success']) {
          const lastIndex =
            historyResponse['data']['data'].length - 1;
          const secondLastIndex =
            historyResponse['data']['data'].length - 2;
          const todaysLastObject =
            historyResponse['data']['data'][lastIndex];
          const todaysSecondLastObject =
            historyResponse['data']['data'][secondLastIndex];

          console.log(todaysLastObject['day']);
          setTodaysConfirmedCases(
            todaysLastObject['summary']['total'] -
              todaysSecondLastObject['summary']['total'],
          );
          setTodaysRecoveredCases(
            todaysLastObject['summary']['discharged'] -
              todaysSecondLastObject['summary']['discharged'],
          );
          setTodaysDeathCases(
            todaysLastObject['summary']['deaths'] -
              todaysSecondLastObject['summary']['deaths'],
          );
          setTodaysDate(gettingDate(todaysLastObject['day']));
        }

        stateObj.forEach(data => {
          let tempArr = [];
          tempArr.push(data['loc']);
          tempArr.push(
            data['totalConfirmed'] -
              (data['discharged'] + data['deaths']),
          );
          tempArr.push(data['totalConfirmed']);
          tempArr.push(data['discharged']);
          tempArr.push(data['deaths']);
          tabData.push(tempArr);
        });

        // sort the tabData
        let sortedArray = tabData.sort(function(a, b) {
          return b[2] - a[2];
        });
        setTableData(sortedArray);
      }
    } catch (err) {
      console.log('Something went wrong', err);
      setShowCatchModal(true);
    }
  };
  if (showCatchModal) {
    return (
      <View>
        <AppModal isVisible={true}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                {
                  borderColor: theme
                    ? darkColorTheme.secondary
                    : lightColorTheme.primary,
                },
                {
                  backgroundColor: theme
                    ? darkColorTheme.primary
                    : lightColorTheme.secondary,
                },
              ]}
            >
              <AppText
                title="Something went wrong."
                style={[
                  GlobalCss.largeTextRegular,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.primary,
                  },
                ]}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowCatchModal(false);
                  loadListing(true);
                }}
              >
                <View
                  style={[
                    styles.modalButtonContainer,
                    {
                      borderColor: theme
                        ? darkColorTheme.statusBarColor
                        : lightColorTheme.statusBarColor,
                    },
                  ]}
                >
                  <AppText
                    title="Try again"
                    style={[
                      styles.buttonStyle,
                      {
                        color: theme
                          ? darkColorTheme.secondary
                          : lightColorTheme.primary,
                        backgroundColor: theme
                          ? darkColorTheme.primary
                          : lightColorTheme.secondary,
                      },
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </AppModal>
      </View>
    );
  }
  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {
            backgroundColor: theme
              ? darkColorTheme.primary
              : lightColorTheme.secondary,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={
            theme ? darkColorTheme.secondary : lightColorTheme.primary
          }
        />
        <AppText
          title="Please wait..."
          style={[
            GlobalCss.mediumTextMedium,
            {
              color: theme
                ? darkColorTheme.secondary
                : lightColorTheme.primary,
            },
          ]}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        GlobalCss.container,
        {
          backgroundColor: theme
            ? darkColorTheme.primary
            : lightColorTheme.secondary,
        },
      ]}
    >
      <ScrollView nestedScrollEnabled>
        <ListItem
          left={true}
          leftComponent={
            <AppText
              title="Theme"
              style={[
                GlobalCss.mediumTextRegular,
                {
                  color: theme
                    ? darkColorTheme.secondary
                    : lightColorTheme.blackColor,
                },
              ]}
            />
          }
          showBorder={false}
          right={true}
          rightComponent={<RenderSwitch />}
        />
        <Card
          topLeft={true}
          topCenter={true}
          topRight={true}
          middleSection={true}
          topLeftComponent={
            <View style={styles.topRightComponentStyle}>
              <AppText
                title="L.U. Date"
                style={[
                  GlobalCss.extraSmallTextBold,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
              />
              <AppText
                title={gettingDate(lastUpdatedTimezone)}
                style={[
                  GlobalCss.extraSmallTextRegular,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
              />
            </View>
          }
          topCenterComponent={
            <View style={styles.topRightComponentStyle}>
              <AppText
                title="Total Cases"
                style={[
                  GlobalCss.mediumTextBold,
                  {
                    marginTop: 10,
                    color: lightColorTheme.confirmedCasesColor,
                  },
                ]}
              />
              <AppText
                title={numberWithCommas(totalConfirmedCases)}
                style={[
                  GlobalCss.smallTextRegular,
                  { color: lightColorTheme.confirmedCasesColor },
                ]}
              />
            </View>
          }
          topRightComponent={
            <View style={styles.topRightComponentStyle}>
              <AppText
                title="L.U. Time"
                style={[
                  GlobalCss.extraSmallTextBold,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
              />
              <AppText
                title={gettingTime(lastUpdatedTimezone)}
                style={[
                  GlobalCss.extraSmallTextRegular,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
              />
            </View>
          }
          middleSectionComponent={
            <View style={styles.middleSectionContainer}>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    { color: lightColorTheme.activeCasesColor },
                  ]}
                  title="Active"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    { color: lightColorTheme.activeCasesColor },
                  ]}
                  title={numberWithCommas(totalActiveCases)}
                />
              </View>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                  title="Recovered"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                  title={numberWithCommas(totalRecoveredCases)}
                />
              </View>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                  title="Deaths"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                  title={numberWithCommas(totalDeaths)}
                />
              </View>
            </View>
          }
        />
        {/* TODO: Todays component */}
        <Card
          todaysStyle={{ height: 100 }}
          topCenter={true}
          topCenterComponent={
            <View
              style={[
                styles.middleContainer,
                { flexDirection: 'row' },
              ]}
            >
              <AppText
                style={[
                  GlobalCss.smallTextMedium,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
                title="Today's Cases - "
              />
              <AppText
                style={[
                  GlobalCss.smallTextRegular,
                  {
                    color: theme
                      ? darkColorTheme.secondary
                      : lightColorTheme.deathsColor,
                  },
                ]}
                title={todaysDate}
              />
            </View>
          }
          middleSection={true}
          middleSectionComponent={
            <View style={styles.middleSectionContainer}>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    { color: lightColorTheme.confirmedCasesColor },
                  ]}
                  title="Confirmed"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    { color: lightColorTheme.confirmedCasesColor },
                  ]}
                  title={numberWithCommas(todaysConfirmedCases)}
                />
              </View>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                  title="Recovered"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                  title={numberWithCommas(todaysRecoveredCases)}
                />
              </View>
              <View style={styles.middleContainer}>
                <AppText
                  style={[
                    GlobalCss.mediumTextMedium,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                  title="Deaths"
                />
                <AppText
                  style={[
                    GlobalCss.smallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                  title={numberWithCommas(todaysDeathCases)}
                />
              </View>
            </View>
          }
        />
        {/* TODO: Table Component */}
        <TouchableWithoutFeedback onPress={handleRefresh}>
          <View style={[styles.buttonContainer]}>
            <AppText
              title="Refresh"
              style={[
                styles.buttonStyle,
                {
                  borderWidth: 1,
                  color: theme
                    ? darkColorTheme.secondary
                    : lightColorTheme.primary,
                  backgroundColor: theme
                    ? darkColorTheme.primary
                    : lightColorTheme.secondary,
                  borderColor: theme
                    ? darkColorTheme.statusBarColor
                    : lightColorTheme.statusBarColor,
                },
              ]}
            />
          </View>
        </TouchableWithoutFeedback>

        <CustomTable
          hideTested={true}
          tableHead={tableHead}
          tableData={tableData}
          widthArr={widthArr}
          listing={listing}
        />
      </ScrollView>
      {/* <AdMobBanner
        bannerSize="banner"
        adUnitID={Android_Add_Unit} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false} // true or false
        onDidFailToReceiveAdWithError={err =>
          console.log('banner error', err)
        }
      /> */}
      <AdMob />
    </View>
  );
};

const styles = StyleSheet.create({
  topRightComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleContainer: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonStyle: {
    ...GlobalCss.smallTextMedium,
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 2,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(125,125,125,0.8)',
  },
  modalContent: {
    width: screenWidth - 100,
    height: 200,
    borderWidth: 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    marginRight: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(OfficialData);
