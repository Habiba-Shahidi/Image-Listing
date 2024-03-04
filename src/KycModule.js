// KycModule.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import AdhaarUploader from './AdhaarUploader';
import KYCHeader from './KYCHeader';

const KycModule = () => {
 

  return (
    <ImageBackground
      source={require('../src/Images/BG.jpg')} // Replace 'your-background-image.jpg' with the actual image file
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
     <KYCHeader />
      <AdhaarUploader />
    </View>
    </ImageBackground>
  );
};

export default KycModule;


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

