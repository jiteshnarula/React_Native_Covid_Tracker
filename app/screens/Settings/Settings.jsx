import React from 'react';
import { View, Text } from 'react-native';
import GlobalCSS from '../../config/globalcss';
import ListItem from '../../components/ListItem';
import AppText from '../../components/Form/AppText';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { connect } from 'react-redux';

const Settings = ({ theme }) => {
  return (
    <View style={GlobalCSS.container}>
      <ListItem
        left={true}
        leftComponent={
          <AppText
            title="Theme"
            style={[
              GlobalCSS.mediumTextRegular,
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
      <ListItem
        left={true}
        leftComponent={
          <AppText
            title="About us"
            style={[
              GlobalCSS.mediumTextRegular,
              {
                color: theme
                  ? darkColorTheme.secondary
                  : lightColorTheme.blackColor,
              },
            ]}
          />
        }
        right={false}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(Settings);
