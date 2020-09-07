import React from 'react';
import { Modal, ImageBackground } from 'react-native';
import AppText from './Form/AppText';

const AppModal = (props) => {
  const {isVisible} = props;
  return <Modal visible={isVisible}
  animationType="slide"
  transparent={true}
   >{props.children}</Modal>
   
};

export default AppModal;
