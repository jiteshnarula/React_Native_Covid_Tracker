import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';

const Home = () => {
  return (
    <View style={GlobalCss.container}>
      <ListItem
        title="Theme"
        textStyle={GlobalCss.mediumTextRegular}
      />
    </View>
  );
};

export default Home;
