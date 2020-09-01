import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows, Cell } from 'react-native-table-component';
import { lightColorTheme } from '../config/theme';
import GlobalCSS from '../config/globalcss';
import { connect } from 'react-redux';
import AppText from './Form/AppText';
import { Entypo } from '@expo/vector-icons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import AppModal from './AppModal';

const CustomTable = ({ tableHead, tableData, widthArr, listing }) => {
  const [showModal, setShowModal] = useState(false);
  const handleRowDataClick = rowData => {
    setShowModal(false);
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
              lightColorTheme.blackColor,
            ]}
          />,
        );

      if (i === 1)
        tempArr.push(
          <AppText
            title={data[1]}
            style={[
              styles.tableDataStyle,
              { color: lightColorTheme.confirmedCasesColor },
            ]}
          />,
        );
      if (i === 2)
        tempArr.push(
          <AppText
            title={data[2]}
            style={[
              styles.tableDataStyle,
              { color: lightColorTheme.recoveredColor },
            ]}
          />,
        );
      if (i === 3)
        tempArr.push(
          <AppText
            title={data[3]}
            style={[
              styles.tableDataStyle,
              { color: lightColorTheme.deathsColor },
            ]}
          />,
        );
      if (i === 4)
        tempArr.push(
          <AppText
            title={data[4]}
            style={[
              styles.tableDataStyle,
              { color: lightColorTheme.testedColor },
            ]}
          />,
        );
    }
    return tempArr;
  };
  const elementTableHead = thData => {
    let tempArr = [];
    for (let i = 0; i < thData.length; i++) {
      if (i === 0) {
        tempArr.push(
          <AppText title={thData[0]} style={styles.tableHeadStyle} />,
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
                color: lightColorTheme.recoveredColor,
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
                color: lightColorTheme.deathsColor,
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
    <View style={styles.container}>
      <AppModal isVisible={showModal}>
        <View>
          <View style={styles.crossContainer}>
            <Entypo
              name="cross"
              size={30}
              color="black"
              onPress={() => setShowModal(false)}
            />
          </View>
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
              style={styles.headStyle}
              textStyle={styles.text}
              widthArr={widthArr}
              style={styles.header}
              key={tableHead}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table
            // borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
            >
              {/* <Row
              data={tableHead}
              style={styles.headStyle}
              textStyle={styles.text}
            /> */}
              {tableData.map((rowData, index) => (
                <TouchableHighlight
                  onPress={() => handleRowDataClick(rowData)}
                  key={index}
                >
                  <Row
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#F7F6E7' },
                    ]}
                    widthArr={widthArr}
                    data={element(rowData)}
                    textStyle={[styles.text]}
                  />
                </TouchableHighlight>
              ))}
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
    padding: 16,
    paddingTop: 30,
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
    backgroundColor: lightColorTheme.lightPrimary,
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
    padding: 10,
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};

export default connect(mapStateToProps)(CustomTable);
