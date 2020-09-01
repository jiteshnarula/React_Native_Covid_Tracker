import React from 'react';
import { Modal } from 'react-native';
import AppText from './Form/AppText';

const AppModal = ({ isVisisble, children }) => {
  return <Modal visible={isVisisble}>{children}</Modal>;
};

export default AppModal;
