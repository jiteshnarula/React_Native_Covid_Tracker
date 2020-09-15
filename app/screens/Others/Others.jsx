import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import GlobalCSS from '../../config/globalcss';
import { screenWidth } from '../../contants/widthandheight';
import { LineChart } from 'react-native-chart-kit';
import AppText from '../../components/Form/AppText';
import {
  getOfficialListings,
  getOfficialHistoryListings,
} from '../../api/officialListing';
import Card from '../../components/Card';
import { cos } from 'react-native-reanimated';
import { numberWithCommas } from '../../components/CommonFunctions';

const Others = () => {
  const [selectedState, setSelectedState] = useState('India');
  const [loading, setLoading] = React.useState(false);
  const [historyResponse, setHistoryResponse] = useState([]);
  const [stateArr, setStateArr] = React.useState([]);
  const [lastDateObj, setLastDateObj] = useState();
  const [
    selectedStateConfirmedCases,
    setSelectedStateConfirmedCases,
  ] = useState([]);
  const [
    selectedStateRecoveredCases,
    setSelectedStateRecoveredCases,
  ] = useState([]);
  const [
    selectedStateActiveCases,
    setSelectedStateActiveCases,
  ] = useState([]);
  const [
    selectedStateDeathCases,
    setSelectedStateDeathCases,
  ] = useState([]);

  const getttingChartReady = () => {
    const todaysDate = lastDateObj['day'];
    const month = new Date(todaysDate).getMonth() + 1;
    console.log(todaysDate, month + 1);

    // const data = {
    //   labels: ['March', 'April', 'May', 'June'],
    //   datasets: [
    //     {
    //       data: [20, 45, 28, 80, 99, 43],
    //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    //       strokeWidth: 2, // optional
    //     },
    //   ],
    //   legend: ['Rainy Days'], // optional
    // };
    // const chartConfig = {
    //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //   strokeWidth: 2, // optional, default 3
    //   barPercentage: 0.5,
    //   useShadowColorFromDataset: false, // optional
    // };
  };

  // const [tableData, setTableData] = useState([]);
  // const [listing, setListing] = useState([]);
  // const [totalActiveCases, setTotalActiveCases] = useState('');
  // const [totalDeaths, setTotalDeaths] = useState('');
  // const [totalConfirmedCases, setTotalConfirmedCases] = useState('');
  // const [totalRecoveredCases, setTotalRecoveredCases] = useState('');
  // const [totalTestedCases, setTotalTestedCases] = useState('');
  // const [lastUpdatedTimezone, setLastUpdatedTimezone] = useState('');
  // const [refreshing, setRefreshing] = React.useState(false);
  // const [
  //   todaysConfirmedCases,
  //   setTodaysConfirmedCases,
  // ] = React.useState('');
  // const [todaysDeathCases, setTodaysDeathCases] = React.useState('');
  // const [
  //   todaysRecoveredCases,
  //   setTodaysRecoveredCases,
  // ] = React.useState('');
  // const [todaysDate, setTodaysDate] = React.useState('');

  useEffect(() => {
    loadListing(true);
  }, []);

  const loadListing = async mode => {
    let historyResponse;
    try {
      if (mode) setLoading(true);
      historyResponse = await getOfficialHistoryListings();
      if (mode) setLoading(false);
      if (historyResponse.data.success) {
        const tempStateArr = [];
        const tempConfirmedArr = [];
        const tempRecoveredArr = [];
        const tempDeceasedArr = [];
        const tempMonthArr = [];
        setHistoryResponse(historyResponse);
        const lastIndex = historyResponse['data']['data'].length - 1;
        const lastObj = historyResponse['data']['data'][lastIndex];
        setLastDateObj(lastObj);
        lastObj.regional.map(data => {
          tempStateArr.push(data.loc);
        });
        setStateArr(tempStateArr);
        handleDropDown(selectedState);

        // setLastDateObj(lastObj)
      }

      // setListing(response.data);
      // const stateObj = response['data']['data']['regional'];
      // const summaryObj = response['data']['data']['summary'];
      // const tabData = [];
      // if (response.data.success) {
      //   setTotalConfirmedCases(summaryObj['total']);
      //   setTotalRecoveredCases(summaryObj['discharged']);
      //   setTotalActiveCases(
      //     summaryObj['total'] -
      //       (summaryObj['discharged'] + summaryObj['deaths']),
      //   );
      //   setTotalDeaths(summaryObj['deaths']);
      //   setLastUpdatedTimezone(response['data']['lastOriginUpdate']);

      //   if (historyResponse['data']['success']) {
      //     const lastIndex =
      //       historyResponse['data']['data'].length - 1;
      //     const secondLastIndex =
      //       historyResponse['data']['data'].length - 2;
      //     const todaysLastObject =
      //       historyResponse['data']['data'][lastIndex];
      //     const todaysSecondLastObject =
      //       historyResponse['data']['data'][secondLastIndex];

      //     console.log(todaysLastObject['day']);
      //     setTodaysConfirmedCases(
      //       todaysLastObject['summary']['total'] -
      //         todaysSecondLastObject['summary']['total'],
      //     );
      //     setTodaysRecoveredCases(
      //       todaysLastObject['summary']['discharged'] -
      //         todaysSecondLastObject['summary']['discharged'],
      //     );
      //     setTodaysDeathCases(
      //       todaysLastObject['summary']['deaths'] -
      //         todaysSecondLastObject['summary']['deaths'],
      //     );
      //     setTodaysDate(gettingDate(todaysLastObject['day']));
      //   }

      //   stateObj.forEach(data => {
      //     let tempArr = [];
      //     tempArr.push(data['loc']);
      //     tempArr.push(
      //       data['totalConfirmed'] -
      //         (data['discharged'] + data['deaths']),
      //     );
      //     tempArr.push(data['totalConfirmed']);
      //     tempArr.push(data['discharged']);
      //     tempArr.push(data['deaths']);
      //     tabData.push(tempArr);
      //   });

      //   setTableData(tabData);
    } catch (err) {
      console.log('Something went wrong', err);
      return;
    }
  };
  // if (loading) {
  //   return (
  //     <View
  //       style={[
  //         styles.loadingContainer,
  //         {
  //           backgroundColor: theme
  //             ? darkColorTheme.primary
  //             : lightColorTheme.secondary,
  //         },
  //       ]}
  //     >
  //       <ActivityIndicator
  //         size="large"
  //         color={
  //           theme
  //             ? darkColorTheme.secondary
  //             : lightColorTheme.blackColor
  //         }
  //       />
  //       <AppText
  //         title="Please wait..."
  //         style={[
  //           GlobalCss.mediumTextMedium,
  //           {
  //             color: theme
  //               ? darkColorTheme.secondary
  //               : lightColorTheme.blackColor,
  //           },
  //         ]}
  //       />
  //     </View>
  //   );
  // }
  const handleDropDown = selectedState => {
    setSelectedState(selectedState);
    getttingChartReady();
    if (selectedState === 'India') {
      const selectedObj = lastDateObj['summary'];
      setSelectedStateConfirmedCases(selectedObj['total']);
      setSelectedStateRecoveredCases(selectedObj['discharged']);
      setSelectedStateDeathCases(selectedObj['deaths']);
      setSelectedStateActiveCases(
        selectedObj['total'] -
          (selectedObj['discharged'] + selectedObj['deaths']),
      );
      return;
    }
    for (let i = 0; i < lastDateObj['regional'].length; i++) {
      if (lastDateObj['regional'][i]['loc'] === selectedState) {
        const selectedObj = lastDateObj['regional'][i];
        setSelectedStateConfirmedCases(selectedObj['totalConfirmed']);
        setSelectedStateRecoveredCases(selectedObj['discharged']);
        setSelectedStateDeathCases(selectedObj['deaths']);
        setSelectedStateActiveCases(
          selectedObj['totalConfirmed'] -
            (selectedObj['discharged'] + selectedObj['deaths']),
        );
        break;
      }
    }
  };

  return (
    <View style={GlobalCSS.container}>
      {/* <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      /> */}

      <AppText title="Others" />

      <View style={styles.dropdownContianer}>
        <Picker
          selectedValue={selectedState}
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue, itemIndex) =>
            handleDropDown(itemValue)
          }
        >
          <Picker.Item key="India" label="India" value="India" />
          {stateArr.map(data => {
            return (
              <Picker.Item key={data} label={data} value={data} />
            );
          })}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          topCenter={true}
          topCenterComponent={
            <View>
              <AppText title="Confirmed" />
              <AppText
                title={numberWithCommas(selectedStateConfirmedCases)}
              />
            </View>
          }
          todaysStyle={{ height: 100, width: 100 }}
        />

        <Card
          topCenter={true}
          topCenterComponent={
            <View>
              <AppText title="Active" />
              <AppText
                title={numberWithCommas(selectedStateActiveCases)}
              />
            </View>
          }
          todaysStyle={{ height: 100, width: 100 }}
        />

        <Card
          topCenter={true}
          topCenterComponent={
            <View>
              <AppText title="Recovered" />
              <AppText
                title={numberWithCommas(selectedStateRecoveredCases)}
              />
            </View>
          }
          todaysStyle={{ height: 100, width: 100 }}
        />

        <Card
          topCenter={true}
          topCenterComponent={
            <View>
              <AppText title="Deceased" />
              <AppText
                title={numberWithCommas(selectedStateDeathCases)}
              />
            </View>
          }
          todaysStyle={{ height: 100, width: 100 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContianer: {
    alignItems: 'center',
  },
});

export default Others;
