import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import GlobalCSS from '../../config/globalcss';
import ListItem from '../../components/ListItem';
import AppText from '../../components/Form/AppText';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { connect } from 'react-redux';

import routes from '../../navigation/routes';
import AdMob from '../../components/AddMob';

const Settings = props => {
  const { theme, navigation } = props;
  return (
    <View
      style={[
        GlobalCSS.container,
        {
          backgroundColor: theme
            ? darkColorTheme.primary
            : lightColorTheme.secondary,
        },
      ]}
    >
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
        showBorder={true}
        right={true}
        rightComponent={<RenderSwitch />}
      />

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(routes.CONTACT_HELPLINE)}
      >
        <View>
          <ListItem
            left={true}
            leftComponent={
              <AppText
                title={routes.CONTACT_HELPLINE}
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
            showBorder={true}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(routes.ABOUT)}
      >
        <View>
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
      </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <AdMob />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(Settings);
