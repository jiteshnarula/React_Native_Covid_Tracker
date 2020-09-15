import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { Table, Row, Rows, Cell } from 'react-native-table-component';
import { lightColorTheme, darkColorTheme } from '../config/theme';
import GlobalCSS from '../config/globalcss';
import { connect } from 'react-redux';
import AppText from './Form/AppText';
import { Entypo } from '@expo/vector-icons';

import AppModal from './AppModal';
import {
  screenWidth,
  screenHeight,
} from '../contants/widthandheight';
import { numberWithCommas } from './CommonFunctions';

const CustomTable = ({
  tableHead,
  tableData,
  widthArr,
  listing,
  theme,
  hideTested,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [stateName, setStateName] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [population, setPopulation] = useState('');
  const [notes, setNotes] = useState('');
  const districtTableHead = [
    'Districts',
    'Active',
    'Confirmed',
    'Recovered',
    'Deaths',
    'Tested',
  ];
  const handleRowDataClick = rowData => {
    const districtDetails = [];
    setShowModal(true);
    setStateName(rowData[0]);
    setNotes(
      listing[rowData[6]]['meta']['notes']
        ? listing[rowData[6]]['meta']['notes']
        : undefined,
    );
    setPopulation(
      listing[rowData[6]]['meta']['population']
        ? listing[rowData[6]]['meta']['population']
        : undefined,
    );
    if (Object.keys(listing[rowData[6]]['districts']).length > 0) {
      Object.keys(listing[rowData[6]]['districts']).map(data => {
        const commonObj = listing[rowData[6]]['districts'][data];
        const districtObj =
          listing[rowData[6]]['districts'][data]['total'];

        const activeCases =
          (districtObj['confirmed'] ? districtObj['confirmed'] : 0) -
          (districtObj['recovered'] ? districtObj['recovered'] : 0) -
          (districtObj['deceased'] ? districtObj['deceased'] : 0);

        const tempArr = [];
        tempArr.push(data);
        tempArr.push(
          activeCases <= 0 ? '-' : numberWithCommas(activeCases),
        );
        tempArr.push(
          districtObj['confirmed'] > 0
            ? numberWithCommas(districtObj['confirmed'])
            : '-',
        );
        tempArr.push(
          districtObj['recovered'] > 0
            ? numberWithCommas(districtObj['recovered'])
            : '-',
        );
        tempArr.push(
          districtObj['deceased'] > 0
            ? numberWithCommas(districtObj['deceased'])
            : '-',
        );
        tempArr.push(
          districtObj['tested'] > 0
            ? numberWithCommas(districtObj['tested'])
            : '-',
        );
        tempArr.push(0);
        let activeDeltaCases = 0;

        if ('delta' in commonObj) {
          const districtDeltaObj =
            listing[rowData[6]]['districts'][data]['delta'];
          if (
            'confirmed' in districtDeltaObj &&
            'recovered' in districtDeltaObj &&
            'deceased' in districtDeltaObj
          ) {
            activeDeltaCases =
              (districtDeltaObj['confirmed']
                ? districtDeltaObj['confirmed']
                : 0) -
              (districtDeltaObj['recovered']
                ? districtDeltaObj['recovered']
                : 0) -
              (districtDeltaObj['deceased']
                ? districtDeltaObj['deceased']
                : 0);
          } else {
            activeDeltaCases = 0;
          }
          tempArr.push(activeDeltaCases > 0 ? activeDeltaCases : 0);

          if ('confirmed' in districtDeltaObj) {
            tempArr.push(
              districtDeltaObj['confirmed']
                ? districtDeltaObj['confirmed']
                : 0,
            );
          } else {
            tempArr.push(0);
          }

          if ('recovered' in districtDeltaObj) {
            tempArr.push(
              districtDeltaObj['recovered']
                ? districtDeltaObj['recovered']
                : 0,
            );
          } else {
            tempArr.push(0);
          }

          if ('deceased' in districtDeltaObj) {
            tempArr.push(
              districtDeltaObj['deceased']
                ? districtDeltaObj['deceased']
                : 0,
            );
          } else {
            tempArr.push(0);
          }

          if ('tested' in districtDeltaObj) {
            tempArr.push(
              districtDeltaObj['tested']
                ? districtDeltaObj['tested']
                : 0,
            );
          } else {
            tempArr.push(0);
          }
        }

        districtDetails.push(tempArr);
      });
      setDistricts(districtDetails);
    } else {
      console.log('Something went wrong');
    }
  };

  const element = data => {
    let tempArr = [];

    for (let i = 0; i < data.length; i++) {
      if (i === 0)
        tempArr.push(
          <AppText
            title={data[0]}
            style={[
              styles.tableDataStyle,
              {
                color: theme
                  ? darkColorTheme.secondary
                  : lightColorTheme.blackColor,
              },
            ]}
          />,
        );

      if (i === 1)
        tempArr.push(
          <View>
            {data[7] > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  title="+"
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.confirmedCasesColor },
                  ]}
                />

                <AppText
                  title={numberWithCommas(data[7])}
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.confirmedCasesColor },
                  ]}
                />
              </View>
            )}
            <AppText
              title={data[1]}
              style={[
                styles.tableDataStyle,
                { color: lightColorTheme.confirmedCasesColor },
              ]}
            />
          </View>,
        );
      if (i === 2)
        tempArr.push(
          <View>
            {data[8] > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  title="+"
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.yellowColor },
                  ]}
                />
                <AppText
                  title={numberWithCommas(data[8])}
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.yellowColor },
                  ]}
                />
              </View>
            )}
            <AppText
              title={data[2]}
              style={[
                styles.tableDataStyle,
                { color: lightColorTheme.yellowColor },
              ]}
            />
          </View>,
        );
      if (i === 3)
        tempArr.push(
          <View>
            {data[9] > 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <AppText
                  title="+"
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                />
                <AppText
                  title={numberWithCommas(data[9])}
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.recoveredColor },
                  ]}
                />
              </View>
            )}
            <AppText
              title={data[3]}
              style={[
                styles.tableDataStyle,
                { color: lightColorTheme.recoveredColor },
              ]}
            />
          </View>,
        );
      if (i === 4)
        tempArr.push(
          <View>
            {data[10] > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  title="+"
                  style={[
                    styles.tableDataStyle,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                />
                <AppText
                  title={numberWithCommas(data[10])}
                  style={[
                    styles.tableDataStyle,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.deathsColor,
                    },
                  ]}
                />
              </View>
            )}
            <AppText
              title={data[4]}
              style={[
                styles.tableDataStyle,
                {
                  color: theme
                    ? darkColorTheme.lightWhite
                    : lightColorTheme.deathsColor,
                },
              ]}
            />
          </View>,
        );
      if (!hideTested && i === 5)
        tempArr.push(
          <View>
            {data[11] > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  title="+"
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.testedColor },
                  ]}
                />
                <AppText
                  title={numberWithCommas(data[11])}
                  style={[
                    styles.tableDataStyle,
                    { color: lightColorTheme.testedColor },
                  ]}
                />
              </View>
            )}

            <AppText
              title={data[5]}
              style={[
                styles.tableDataStyle,
                { color: lightColorTheme.testedColor },
              ]}
            />
          </View>,
        );
    }
    return tempArr;
  };
  const elementTableHead = thData => {
    let tempArr = [];
    for (let i = 0; i < thData.length; i++) {
      if (i === 0) {
        tempArr.push(
          <AppText
            title={thData[0]}
            style={[
              styles.tableHeadStyle,
              {
                color: theme
                  ? darkColorTheme.secondary
                  : lightColorTheme.blackColor,
              },
            ]}
          />,
        );
      }
      if (i === 1) {
        tempArr.push(
          <AppText
            title={thData[1]}
            style={[
              styles.tableHeadStyle,
              {
                color: lightColorTheme.confirmedCasesColor,
              },
            ]}
          />,
        );
      }
      if (i === 2) {
        tempArr.push(
          <AppText
            title={thData[2]}
            style={[
              styles.tableHeadStyle,
              {
                color: lightColorTheme.yellowColor,
              },
            ]}
          />,
        );
      }
      if (i === 3) {
        tempArr.push(
          <AppText
            title={thData[3]}
            style={[
              styles.tableHeadStyle,
              {
                color: lightColorTheme.recoveredColor,
              },
            ]}
          />,
        );
      }
      if (i === 4) {
        tempArr.push(
          <AppText
            title={thData[4]}
            style={[
              styles.tableHeadStyle,
              {
                color: theme
                  ? darkColorTheme.lightWhite
                  : lightColorTheme.deathsColor,
              },
            ]}
          />,
        );
      }
      if (!hideTested && i === 5) {
        tempArr.push(
          <AppText
            title={thData[5]}
            style={[
              styles.tableHeadStyle,
              {
                color: lightColorTheme.testedColor,
              },
            ]}
          />,
        );
      }
    }
    return tempArr;
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme
            ? darkColorTheme.primary
            : lightColorTheme.secondary,
          alignItems: 'center',
        },
      ]}
    >
      <AppModal isVisible={showModal}>
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
            <View>
              <TouchableWithoutFeedback
                onPress={() => setShowModal(false)}
              >
                <View
                  style={[
                    styles.topBar,
                    {
                      backgroundColor: theme
                        ? darkColorTheme.primary
                        : lightColorTheme.primary,
                    },
                  ]}
                >
                  <View>
                    <Entypo
                      name="squared-cross"
                      size={30}
                      color={lightColorTheme.confirmedCasesColor}
                      style={styles.crossContainer}
                      onPress={() => setShowModal(false)}
                    />
                  </View>
                  <View>
                    <AppText
                      title={stateName}
                      style={[
                        styles.stateName,
                        {
                          color: theme
                            ? darkColorTheme.secondary
                            : lightColorTheme.secondary,
                        },
                      ]}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.notesContainer}>
              {notes && (
                <>
                  <AppText
                    title="Notes:"
                    style={[
                      styles.noteHeader,
                      {
                        color: theme
                          ? darkColorTheme.secondary
                          : lightColorTheme.blackColor,
                      },
                    ]}
                  />
                  <AppText
                    title={notes}
                    style={[
                      styles.noteContent,
                      {
                        color: theme
                          ? darkColorTheme.secondary
                          : lightColorTheme.blackColor,
                      },
                    ]}
                  />
                </>
              )}
            </View>
            <View style={styles.notesContainer}>
              {population && (
                <>
                  <AppText
                    title="Population:"
                    style={[
                      styles.noteHeader,
                      {
                        color: theme
                          ? darkColorTheme.secondary
                          : lightColorTheme.blackColor,
                      },
                    ]}
                  />
                  <AppText
                    title={numberWithCommas(population)}
                    style={[
                      styles.noteContent,
                      {
                        color: theme
                          ? darkColorTheme.secondary
                          : lightColorTheme.blackColor,
                      },
                    ]}
                  />
                </>
              )}
            </View>
            {/* table contaner */}
            <View style={{ flex: 1 }}>
              <ScrollView horizontal={true}>
                <View style={{ marginBottom: 50 }}>
                  <Table>
                    <Row
                      data={elementTableHead(districtTableHead)}
                      textStyle={styles.text}
                      widthArr={widthArr}
                      style={[
                        styles.header,
                        {
                          backgroundColor: theme
                            ? darkColorTheme.primary
                            : lightColorTheme.lightPrimary,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderTopColor: theme
                            ? darkColorTheme.secondary
                            : lightColorTheme.lightPrimary,
                        },
                      ]}
                      key={districtTableHead}
                    />
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table
                    // borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
                    >
                      {districts.map((rowData, index) => (
                        <Row
                          key={index}
                          style={[
                            styles.row,
                            index % 2
                              ? {
                                  backgroundColor: theme
                                    ? darkColorTheme.statusBarColor
                                    : '#F7F6E7',
                                }
                              : {
                                  backgroundColor: theme
                                    ? darkColorTheme.primary
                                    : lightColorTheme.secondary,
                                },
                            index === 0 && {
                              borderTopWidth: theme ? 1 : 0,
                              borderTopColor: theme
                                ? darkColorTheme.secondary
                                : lightColorTheme.secondary,
                            },
                          ]}
                          widthArr={widthArr}
                          data={element(rowData)}
                          textStyle={[styles.text]}
                        />
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
            <TouchableWithoutFeedback
              onPress={() => setShowModal(false)}
            >
              <View
                style={[
                  styles.buttonContainer,
                  {
                    borderColor: theme
                      ? darkColorTheme.statusBarColor
                      : lightColorTheme.statusBarColor,
                  },
                ]}
              >
                <AppText
                  title="OK"
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
          <View />
        </View>
      </AppModal>
      <ScrollView horizontal={true}>
        <View>
          <Table
          // borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
          >
            {/* <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/> */}

            <Row
              data={elementTableHead(tableHead)}
              textStyle={styles.text}
              widthArr={widthArr}
              style={[
                styles.header,
                {
                  backgroundColor: theme
                    ? darkColorTheme.primary
                    : lightColorTheme.lightPrimary,
                  borderWidth: 1,
                  borderColor: theme
                    ? darkColorTheme.secondary
                    : lightColorTheme.lightPrimary,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}
              key={tableHead}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table
            // borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
            >
              {tableData.map((rowData, index) => {
                if (!hideTested) {
                  return (
                    <TouchableHighlight
                      onPress={() => handleRowDataClick(rowData)}
                      key={index}
                    >
                      <Row
                        style={[
                          styles.row,
                          index % 2
                            ? {
                                backgroundColor: theme
                                  ? darkColorTheme.statusBarColor
                                  : '#F7F6E7',
                              }
                            : {
                                backgroundColor: theme
                                  ? darkColorTheme.primary
                                  : lightColorTheme.secondary,
                              },
                          {
                            borderLeftWidth: 1,
                            borderLeftColor: theme
                              ? darkColorTheme.secondary
                              : lightColorTheme.lightPrimary,
                            borderRightWidth: 1,
                            borderRightColor: theme
                              ? darkColorTheme.secondary
                              : lightColorTheme.lightPrimary,
                          },
                          index === tableData.length - 1 && {
                            borderBottomWidth: 1,
                            borderBottomColor: theme
                              ? darkColorTheme.secondary
                              : lightColorTheme.lightPrimary,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          },
                        ]}
                        widthArr={widthArr}
                        data={element(rowData)}
                        textStyle={[styles.text]}
                      />
                    </TouchableHighlight>
                  );
                } else {
                  return (
                    <Row
                      key={index}
                      style={[
                        styles.row,
                        index % 2
                          ? {
                              backgroundColor: theme
                                ? darkColorTheme.statusBarColor
                                : '#F7F6E7',
                            }
                          : {
                              backgroundColor: theme
                                ? darkColorTheme.primary
                                : lightColorTheme.secondary,
                            },
                        {
                          borderLeftWidth: 1,
                          borderLeftColor: theme
                            ? darkColorTheme.secondary
                            : lightColorTheme.lightPrimary,
                          borderRightWidth: 1,
                          borderRightColor: theme
                            ? darkColorTheme.secondary
                            : lightColorTheme.lightPrimary,
                        },
                        index === tableData.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: theme
                            ? darkColorTheme.secondary
                            : lightColorTheme.lightPrimary,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        },
                      ]}
                      widthArr={widthArr}
                      data={element(rowData)}
                      textStyle={[styles.text]}
                    />
                  );
                }
              })}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 7,
    marginBottom: 23,
    backgroundColor: '#fff',
    // flex: 1,
    // padding: 5,
    // paddingTop: 30,
  },
  headStyle: {
    height: 40,
    backgroundColor: lightColorTheme.tableHeaderBackgroundColor,
  },
  text: {
    textAlign: 'center',
    ...GlobalCSS.extraSmallTextMedium,
  },
  header: {
    height: 50,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  tableDataStyle: {
    ...GlobalCSS.extraSmallTextRegular,
    textAlign: 'center',
  },
  tableHeadStyle: {
    ...GlobalCSS.extraSmallTextMedium,
    textAlign: 'center',
  },
  crossContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(125,125,125,0.8)',
  },
  modalContent: {
    width: screenWidth - 20,
    height: screenHeight - 60,
    borderWidth: 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  stateName: {
    textAlign: 'center',
    ...GlobalCSS.mediumTextRegular,
    padding: 5,
  },
  topBar: {
    padding: 5,
    justifyContent: 'center',
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  noteHeader: {
    ...GlobalCSS.extraSmallTextBold,
  },
  noteContent: {
    ...GlobalCSS.extraSmallTextRegular,
    marginLeft: 5,
  },
  buttonStyle: {
    ...GlobalCSS.smallTextMedium,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
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

export default connect(mapStateToProps)(CustomTable);
