import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { lightColorTheme } from '../config/theme';
import GlobalCSS from '../config/globalcss';
import { connect } from 'react-redux';

const CustomTable = ({ tableHead, tableData }) => {
  return (
    <View style={styles.container}>
      <Table>
        <Row
          data={tableHead}
          style={styles.headStyle}
          textStyle={styles.text}
        />
        <ScrollView
          bounces
          collapsable
          centerContent
          indicatorStyle={'black'}
        >
          <Rows data={tableData} />
        </ScrollView>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 30,
  },
  headStyle: {
    height: 40,
    backgroundColor: lightColorTheme.tableHeaderBackgroundColor,
  },
  text: {
    textAlign: 'center',
    ...GlobalCSS.extraSmallTextMedium,
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};

export default connect(mapStateToProps)(CustomTable);
