import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../config/theme';

const Card = ({
  theme,
  topLeft,
  topLeftComponent,
  topCenter,
  topCenterComponent,
  topRight,
  topRightComponent,
  middleSection,
  middleSectionComponent,
  todaysStyle,
}) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderColor: theme
            ? darkColorTheme.secondary
            : lightColorTheme.primary,
        },
        todaysStyle,
      ]}
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Top Left */}
        <View>{topLeft && topLeftComponent}</View>
        {/* Top Center */}
        <View>{topCenter && topCenterComponent}</View>
        {/* Top Right */}
        <View>{topRight && topRightComponent}</View>
      </View>

      {/* MiddleSection */}
      {middleSection && middleSectionComponent}
      {/* <View style={{ flexDirection: 'row' }}>
        <Text>Active: 4567</Text>
        <Text>Tested: 4567</Text>
        <Text>Recovered: 4567</Text>
        <Text>Deaths: 4567</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(Card);
