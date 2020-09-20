import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import AppText from '../../components/Form/AppText';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import GlobalCSS from '../../config/globalcss';
import { lightColorTheme, darkColorTheme } from '../../config/theme';
import { connect } from 'react-redux';

const About = props => {
  const { theme } = props;
  const aboutusQA = [
    {
      id: 1,
      title:
        'What is this App and What kind of data one can see through this app?',
      body:
        'This is COVID 19 Tracker app. Basically, Made only for India. Here you can find Official and Unofficial data. Unofficial data is more recent.',
    },
    {
      id: 2,
      title:
        'Why does the app unofficial data have difference in numbers compared to official data?',
      body: `Official data is updated based on MoHFW updates the data at a scheduled time. However, Unofficial data update them based on state press bulletins, official (CM, Health M) handles, PBI, Press Trust of India, ANI reports. These are generally more recent.`,
    },
    {
      id: 3,
      title: 'Sources of Unofficial Data?',
      body: `
      1. The awesome volunteer driven patient tracing data covid19india.org
      2. API (NLP): http://coronatravelhistory.pythonanywhere.com/
      3. API (Travel history): https://api.covid19india.org/travel_history.json`,
    },
    {
      id: 4,
      title: 'Sources of Official Data?',
      body: `
      1. Post Mar 15, data is from The Ministry of Health & Family Welfare 
      2. Pre Mar 15, data is sourced from datameet/covid19
      3.  Medical colleges data: https://api.steinhq.com/v1/storages/5e6e3e9fb88d3d04ae08158c/Hospitals`,
    },

    {
      id: 5,
      title: 'How one can check their district data?',
      body: `District data is only possible to check in case of Unofficial data.`,
    },
    {
      id: 6,
      title: 'Credits',
      body: `
      1. Awesome team at covid19india.org
      2. Hospital & medical colleges data API from NirantK
      3. ICMR testing data API from NirantK
      4. NLP data API from meghanabhange and NirantK
      5. GalacticMaster for reporting updated contact details`,
    },
  ];
  const _head = item => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme
              ? darkColorTheme.statusBarColor
              : lightColorTheme.secondary,
            borderBottomColor: theme
              ? darkColorTheme.lightWhite
              : lightColorTheme.blackColor,
          },
        ]}
      >
        <AppText
          title={item.title}
          style={[
            styles.textStyle,
            GlobalCSS.mediumTextRegular,
            {
              color: theme
                ? darkColorTheme.secondary
                : lightColorTheme.blackColor,
            },
          ]}
        />
      </View>
    );
  };
  const _body = item => {
    return (
      <View
        style={[
          styles.body,
          {
            backgroundColor: theme
              ? darkColorTheme.primary
              : darkColorTheme.lightWhite,
          },
        ]}
      >
        <AppText
          style={[
            GlobalCSS.mediumTextRegular,
            styles.textStyle,
            {
              color: theme
                ? darkColorTheme.secondary
                : lightColorTheme.blackColor,
            },
          ]}
          selectable={true}
          title={item.body}
        />
      </View>
    );
  };

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
      <View style={{ marginBottom: 20 }}>
        <AccordionList
          list={aboutusQA}
          header={_head}
          body={_body}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 0.4,
    backgroundColor: '#F7F6E7',
  },
  body: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'left',
    flexWrap: 'wrap',
  },
});
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(About);
