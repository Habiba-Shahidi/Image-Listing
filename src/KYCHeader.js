// KYCModule.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KYCHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Module</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#2196F3', // You can choose your desired background color
  },
  title: {
    fontSize: 24,
    fontWeight : 'bold',
    color: '#633974', // You can choose your desired text color
  },
});

export default KYCHeader;
