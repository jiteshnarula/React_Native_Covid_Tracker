import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { getAsyncData } from '../../components/CommonFunctions';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import AppText from '../../components/Form/AppText';
import Card from '../../components/Card';
import {
  getOfficialListings,
  getOfficialHistoryListings,
} from '../../api/officialListing';
import CustomTable from '../../components/CustomTable';
import { stateCodes } from '../../contants/statecode';
import {
  numberWithCommas,
  gettingTime,
  gettingDate,
} from '../../components/CommonFunctions';
import XDate from 'xdate';

const OfficialData = ({ theme }) => {
  const [tableData, setTableData] = useState([]);
  const [listing, setListing] = useState([]);
  const [totalActiveCases, setTotalActiveCases] = useState('');
  const [totalConfirmedCases, setTotalConfirmedCases] = useState('');
  const [totalRecoveredCases, setTotalRecoveredCases] = useState('');
  const [totalTestedCases, setTotalTestedCases] = useState('');
  const [lastUpdatedTimezone, setLastUpdatedTimezone] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
        setLastUpdatedTimezone(response['data']['lastOriginUpdate']);
        if (historyResponse['data']['success']) {
          const currentDate = gettingDate(
            response['data']['lastOriginUpdate'],
            true,
          );
          console.log(historyResponse['data']['data'][186]);
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

        setTableData(tabData);
      }
    } catch (err) {
      console.log('Something went wrong', err);
      return;
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    loadListing(false).then(() => {
      setRefreshing(false);
    });
  };
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
                : lightColorTheme.blackColor,
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
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
            </View>
          }
        />
        {/* TODO: Table Component */}
        <CustomTable
          hideTested={true}
          tableHead={tableHead}
          tableData={tableData}
          widthArr={widthArr}
          listing={listing}
        />
      </ScrollView>
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
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(OfficialData);
