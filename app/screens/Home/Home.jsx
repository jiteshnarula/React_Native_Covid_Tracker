import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { getAsyncData } from '../../components/CommonFunctions';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import AppText from '../../components/Form/AppText';
import Card from '../../components/Card';
import listingApi from '../../api/listings';
import CustomTable from '../../components/CustomTable';
import { stateCodes } from '../../contants/statecode';

const Home = ({ theme }) => {
  const [listings, setListings] = useState([]);
  const [tableData, setTableData] = useState([]);

  const tableHead = [
    'State/U.T.',
    'Confirmed',
    'Recovered',
    'Deaths',
    'Tested',
  ];
  const childTableHead = [
    'Districts',
    'Confirmed',
    'Recovered',
    'Deaths',
    'Tested',
  ];
  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    const response = await listingApi.getListings();
    setListings(response);
    // Object.keys(listings['data']['AP']['districts']),
    const tableArray = [];
    stateCodes.map(data => {
      // console.log(listings['data']['AR']['districts']);
      const tempArr = [];
      const stateObj = listings['data'][data.sc]['total'];
      console.log(stateObj);
      if (stateObj && Object.keys(stateObj).length > 0) {
        tempArr.push(data.sn);
        tempArr.push(stateObj['confirmed']);
        tempArr.push(stateObj['deceased']);
        tempArr.push(stateObj['recovered']);
        tempArr.push(stateObj['tested']);
        tableArray.push(tempArr);
      } else {
        console.log('Not found anything');
      }
    });
    setTableData(tableArray);
    // const map = new Map(listings);
    // console.log(
    //   'ressponsecoming from data.json',
    //   listings['data']['AP']['districts'],
    // );
  };
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
              title="29-08-2020"
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
              title="34,61,240"
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
              title="5:30 PM IST"
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
                title="7,50,411"
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
                title="26,47,538"
              />
            </View>

            <View style={styles.middleContainer}>
              <AppText
                style={[
                  GlobalCss.mediumTextMedium,
                  { color: lightColorTheme.testedColor },
                ]}
                title="Tested"
              />
              <AppText
                style={[
                  GlobalCss.smallTextRegular,
                  { color: lightColorTheme.testedColor },
                ]}
                title="26,47,538"
              />
            </View>
          </View>
        }
      />
      {/* TODO: Table Component */}
      <CustomTable tableHead={tableHead} tableData={tableData} />
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
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(Home);
