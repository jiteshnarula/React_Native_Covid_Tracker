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
import {
  numberWithCommas,
  gettingTime,
  gettingDate,
} from '../../components/CommonFunctions';
import XDate from 'xdate';

const Home = ({ theme }) => {
  const [tableData, setTableData] = useState([]);
  const [listing, setListing] = useState([]);
  const [totalActiveCases, setTotalActiveCases] = useState('');
  const [totalConfirmedCases, setTotalConfirmedCases] = useState('');
  const [totalRecoveredCases, setTotalRecoveredCases] = useState('');
  const [totalTestedCases, setTotalTestedCases] = useState('');
  const [lastUpdatedTimezone, setLastUpdatedTimezone] = useState('');

  const tableHead = [
    'State/U.T.',
    'Active',
    'Confirmed',
    'Recovered',
    'Deaths',
    'Tested',
  ];
  const widthArr = [140, 80, 80, 80, 80, 80];
  useEffect(() => {
    loadListing();
  }, []);
  const findingUpdatedDate = date => {};

  const loadListing = async () => {
    let response;
    try {
      response = await listingApi.getListings();
      setListing(response.data);
      const tableArray = [];
      let sumActive = 0;
      let sumConfirmed = 0;
      let sumRecovered = 0;
      let sumTested = 0;
      let temp = '';
      let bool = false;
      let lastUpdated;
      let activeDeltaCases = 0;

      stateCodes.map(data => {
        const tempArr = [];
        const commonObj = response['data'][data.sc];
        const stateObj = response['data'][data.sc]['total'];
        const stateDeltaObject = response['data'][data.sc]['delta'];
        const lastUpdatedObject = response['data'][data.sc]['meta'];
        if (stateObj && Object.keys(stateObj).length > 0) {
          lastUpdated = lastUpdatedObject['last_updated'];

          if (bool) {
            if (new Date(lastUpdated) > new Date(temp)) {
              temp = lastUpdated;
            }
          } else {
            temp = lastUpdated;
            bool = true;
          }
          const activeCases =
            (stateObj['confirmed'] ? stateObj['confirmed'] : 0) -
            (stateObj['recovered'] ? stateObj['recovered'] : 0) -
            (stateObj['deceased'] ? stateObj['deceased'] : 0);

          sumActive += activeCases;

          sumRecovered +=
            stateObj['recovered'] > 0 ? stateObj['recovered'] : 0;

          sumTested +=
            stateObj['tested'] > 0 ? stateObj['tested'] : 0;

          sumConfirmed +=
            stateObj['confirmed'] > 0 ? stateObj['confirmed'] : 0;

          tempArr.push(data.sn);
          tempArr.push(
            activeCases > 0 ? numberWithCommas(activeCases) : '-',
          );
          tempArr.push(
            stateObj['confirmed'] > 0
              ? numberWithCommas(stateObj['confirmed'])
              : '-',
          );
          tempArr.push(
            stateObj['recovered'] > 0
              ? numberWithCommas(stateObj['recovered'])
              : '-',
          );
          tempArr.push(
            stateObj['deceased'] > 0
              ? numberWithCommas(stateObj['deceased'])
              : '-',
          );
          tempArr.push(
            stateObj['tested'] > 0
              ? numberWithCommas(stateObj['tested'])
              : '-',
          );
          tempArr.push(data.sc);

          if ('delta' in commonObj) {
            if (
              'confirmed' in stateDeltaObject &&
              'recovered' in stateDeltaObject &&
              'deceased' in stateDeltaObject
            ) {
              activeDeltaCases =
                (stateDeltaObject['confirmed']
                  ? stateDeltaObject['confirmed']
                  : 0) -
                (stateDeltaObject['recovered']
                  ? stateDeltaObject['recovered']
                  : 0) -
                (stateDeltaObject['deceased']
                  ? stateDeltaObject['deceased']
                  : 0);
            } else {
              activeDeltaCases = 0;
            }
            tempArr.push(
              activeDeltaCases > 0 ? activeDeltaCases : '0',
            );
            if ('confirmed' in stateDeltaObject) {
              tempArr.push(
                stateDeltaObject['confirmed']
                  ? stateDeltaObject['confirmed']
                  : 0,
              );
            } else {
              tempArr.push(0);
            }
            if ('recovered' in stateDeltaObject) {
              tempArr.push(
                stateDeltaObject['recovered']
                  ? stateDeltaObject['recovered']
                  : 0,
              );
            } else {
              tempArr.push(0);
            }
            if ('deceased' in stateDeltaObject) {
              tempArr.push(
                stateDeltaObject['deceased']
                  ? stateDeltaObject['deceased']
                  : 0,
              );
            } else {
              tempArr.push(0);
            }
            if ('tested' in stateDeltaObject) {
              tempArr.push(
                stateDeltaObject['tested']
                  ? stateDeltaObject['tested']
                  : 0,
              );
            } else {
              tempArr.push(0);
            }
          } else {
            tempArr.push(0);
            tempArr.push(0);
            tempArr.push(0);
            tempArr.push(0);
          }

          tableArray.push(tempArr);
        } else {
          console.log('Not found anything');
        }
      });
      setTableData(tableArray);
      setTotalActiveCases(sumActive);
      setTotalConfirmedCases(sumConfirmed);
      setTotalRecoveredCases(sumRecovered);
      setTotalTestedCases(sumTested);
      setLastUpdatedTimezone(temp);
    } catch (err) {
      console.log('Something went wrong', err);
      return;
    }
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
                  { color: lightColorTheme.testedColor },
                ]}
                title="Tested"
              />
              <AppText
                style={[
                  GlobalCss.smallTextRegular,
                  { color: lightColorTheme.testedColor },
                ]}
                title={numberWithCommas(totalTestedCases)}
              />
            </View>
          </View>
        }
      />
      {/* TODO: Table Component */}
      <CustomTable
        tableHead={tableHead}
        tableData={tableData}
        widthArr={widthArr}
        listing={listing}
      />
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
