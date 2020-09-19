import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import AppText from '../../components/Form/AppText';
import GlobalCss from '../../config/globalcss';
import { lightColorTheme } from '../../config/theme';
import AppNavigator from '../../navigation/AppNavigator';

const SplashScreen = () => {
  const logo = require('../../assets/logo.png');

  return (
    <View style={[GlobalCss.container, styles.parentContianer]}>
      <Image source={logo} style={{ height: 150, width: 160 }} />
      <AppText
        title="Stay at home and break the Virus chain"
        style={[
          GlobalCss.largeTextBold,
          {
            textAlign: 'center',
            flexWrap: 'wrap',
            padding: 10,
          },
        ]}
      />
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={lightColorTheme.primary}
        />
        <AppText
          title="Please wait..."
          style={GlobalCss.mediumTextMedium}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
