import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { getAsyncData } from '../../components/CommonFunctions';
import { connect } from 'react-redux';

const Home = () => {
  return (
    <View style={GlobalCss.container}>
      <ListItem
        title="Theme"
        textStyle={GlobalCss.mediumTextRegular}
        right={true}
        rightComponent={<RenderSwitch />}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(Home);
