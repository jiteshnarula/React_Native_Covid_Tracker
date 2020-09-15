import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import ListItem from '../../components/ListItem';
import GlobalCss from '../../config/globalcss';
import RenderSwitch from '../../components/Form/RenderSwitch';
import { getAsyncData } from '../../components/CommonFunctions';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../../config/theme';
import AppText from '../../components/Form/AppText';
import Card from '../../components/Card';
import { getContactsListing } from '../../api/officialListing';
import CustomTable from '../../components/CustomTable';
import { stateCodes } from '../../contants/statecode';
import { AntDesign } from '@expo/vector-icons';
import {
  numberWithCommas,
  gettingTime,
  gettingDate,
} from '../../components/CommonFunctions';
import XDate from 'xdate';
import { FlatList } from 'react-native-gesture-handler';

const ContactHelpline = ({ theme }) => {
  const [contactsListing, setContactListing] = useState([]);
  const [phNo, setPhNo] = useState('');
  const [tfPh, setTfPh] = useState('');
  const [fbLink, setFBLink] = useState(
    'https://www.facebook.com/MoHFWIndia',
  );
  const [twitterLink, setTwitterLink] = useState(
    'https://twitter.com/MoHFW_INDIA',
  );
  const [email, setEmail] = useState('');
  const [regionalData, setRegionalData] = useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    loadContactListing(true);
  }, []);

  const loadContactListing = async mode => {
    let response;
    try {
      if (mode) setLoading(true);
      response = await getContactsListing();
      if (mode) setLoading(false);
      const contactsObj =
        response['data']['data']['contacts']['primary'];
      const regionObj =
        response['data']['data']['contacts']['regional'];
      if (response.data.success) {
        setPhNo(contactsObj['number']);
        setTfPh(contactsObj['number-tollfree']);
        setEmail(contactsObj['email']);
        setFBLink(contactsObj['facebook']);
        setTwitterLink(contactsObj['twitter']);
        setRegionalData(regionObj);
      }
    } catch (err) {
      console.log('Something went wrong', err);
      return;
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {
            backgroundColor: theme
              ? darkColorTheme.primary
              : lightColorTheme.secondary,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={
            theme
              ? darkColorTheme.secondary
              : lightColorTheme.blackColor
          }
        />
        <AppText
          title="Please wait..."
          style={[
            GlobalCss.mediumTextMedium,
            {
              color: theme
                ? darkColorTheme.secondary
                : lightColorTheme.blackColor,
            },
          ]}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        GlobalCss.container,
        {
          backgroundColor: theme
            ? darkColorTheme.primary
            : lightColorTheme.secondary,
        },
      ]}
    >
      <Card
        topLeft={true}
        topCenter={true}
        topLeftComponent={
          <View>
            <AntDesign
              name="twitter"
              size={30}
              color={
                theme
                  ? darkColorTheme.lightWhite
                  : lightColorTheme.primary
              }
              onPress={() => Linking.openURL(twitterLink)}
            />
          </View>
        }
        topRight={true}
        topRightComponent={
          <View>
            <AntDesign
              name="facebook-square"
              size={30}
              color={
                theme
                  ? darkColorTheme.lightWhite
                  : lightColorTheme.primary
              }
              onPress={() => Linking.openURL(fbLink)}
            />
          </View>
        }
        topCenterComponent={
          <View>
            <AppText
              title="Primary Contact Information"
              style={[
                GlobalCss.smallTextMedium,
                {
                  color: theme
                    ? darkColorTheme.secondary
                    : lightColorTheme.primary,
                },
              ]}
            />
          </View>
        }
        middleSection={true}
        middleSectionComponent={
          <View style={styles.primaryContactContainer}>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`tel:${phNo}`)}
            >
              <View style={styles.primaryContactItems}>
                <AppText
                  title="Ph. Number"
                  style={[
                    GlobalCss.extraSmallTextMedium,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
                <AppText
                  title={phNo}
                  style={[
                    GlobalCss.extraSmallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`tel:${tfPh}`)}
            >
              <View style={styles.primaryContactItems}>
                <AppText
                  title="Tollfree Number"
                  style={[
                    GlobalCss.extraSmallTextMedium,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
                <AppText
                  title={tfPh}
                  style={[
                    GlobalCss.extraSmallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`mailto:${email}`)}
            >
              <View style={styles.primaryContactItems}>
                <AppText
                  title="Email"
                  style={[
                    GlobalCss.extraSmallTextMedium,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
                <AppText
                  title={email}
                  style={[
                    GlobalCss.extraSmallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        }
      />
      <View
        style={[
          styles.stateWiseContainer,
          {
            borderColor: theme
              ? darkColorTheme.secondary
              : lightColorTheme.primary,
          },
        ]}
      >
        <AppText
          title="State-Wise Contact Information"
          style={{
            textAlign: 'center',
            color: theme
              ? darkColorTheme.primary
              : lightColorTheme.blackColor,
          }}
        />
      </View>
      <View>
        <FlatList
          data={regionalData}
          keyExtractor={regionalData => regionalData.loc}
          renderItem={({ item, index }) => (
            <ListItem
              left={true}
              leftComponent={
                <AppText
                  title={item.loc}
                  style={[
                    GlobalCss.smallTextRegular,
                    {
                      color: theme
                        ? darkColorTheme.lightWhite
                        : lightColorTheme.blackColor,
                    },
                  ]}
                />
              }
              right={true}
              rightComponent={
                <TouchableWithoutFeedback
                  onPress={() =>
                    Linking.openURL(`tel:${item.number}`)
                  }
                >
                  <AppText
                    selectable
                    title={
                      /[,]/.test(item.number)
                        ? item.number.split(',')[0]
                        : item.number
                    }
                    style={[
                      GlobalCss.smallTextRegular,
                      {
                        color: theme
                          ? darkColorTheme.lightWhite
                          : lightColorTheme.blackColor,
                      },
                    ]}
                  />
                </TouchableWithoutFeedback>
              }
              showBorder={true}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topRightComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleContainer: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  stateWiseContainer: {
    backgroundColor: lightColorTheme.lightPrimary,
    height: 30,
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 7,
  },
  primaryContactContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  primaryContactItems: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(ContactHelpline);
