import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Android_Add_Unit } from '../contants/ads';

import { AdMobBanner } from 'expo-ads-admob';

const AdMob = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [height, setHeight] = useState(0);

  const handleReceived = () => {
    console.log('Add received true', showBanner);
    setShowBanner(true);
  };
  return (
    <View style={!showBanner ? { height: 0 } : {}}>
      <View>
        <AdMobBanner
          bannerSize="fullBanner" // "largeBanner" "fullBanner"
          adUnitID={Android_Add_Unit}
          onDidFailToReceiveAdWithError={err =>
            console.log('Banner error', err)
          }
          onAdViewDidReceiveAd={handleReceived}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdMob;
