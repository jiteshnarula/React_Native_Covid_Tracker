import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
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
      title: 'Are you official?',
      body: 'No',
    },
    {
      id: 2,
      title:
        'What are your sources? How is the data gathered for this project?',
      body:
        'We are using state bulletins and official handles to update our numbers. The data is validated by a group of volunteers and published into a Google sheet and an API. API is available for all at api.covid19india.org. We would love it if you can use this data in the fight against this virus. The source list is here.',
    },
    {
      id: 3,
      title:
        'Why does the app have difference in numbers compared to MOHFW website?',
      body:
        'MoHFW updates the data at a scheduled time. However, we update them based on state press bulletins, official (CM, Health M) handles, PBI, Press Trust of India, ANI reports. These are generally more recent.',
    },
    {
      id: 4,
      title: 'Where can I find the data for this?',
      body:
        'All the data is available through an API for further analysis and development here : api.covid19india.org',
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
      <View style={styles.body}>
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
      <AccordionList
        list={aboutusQA}
        header={_head}
        body={_body}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 0.2,
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
