import AsyncStorage from '@react-native-community/async-storage';
import XDate from 'xdate';
import { format, compareAsc, parse } from 'date-fns';

export const saveAsyncData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getAsyncData = async key => {
  try {
    const response = await AsyncStorage.getItem(key);
    return JSON.parse(response);
  } catch (error) {
    console.log('error');
  }
};

export function numberWithCommas(x) {
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != '') lastThree = ',' + lastThree;
  var res =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return res;
}

export function gettingTime(timeStamp) {
  const givenTime = Date.parse(timeStamp);
  return tConvert(new Date(givenTime).toLocaleTimeString());
  // console.log(format(new Date(timeStamp).getDate(), 'MMMMMMM'))
}

export function gettingDate(timeStamp) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const givenTime = Date.parse(timeStamp);
  const date = new Date(givenTime).getDate();
  const month = new Date(givenTime).getMonth();
  const year = new Date(givenTime).getFullYear();
  return date + ', ' + monthNames[month] + ' ' + year;
}

function tConvert(time) {
  // Check correct time format and split into components
  time = time
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}
