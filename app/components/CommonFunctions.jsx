import AsyncStorage from '@react-native-community/async-storage';

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
