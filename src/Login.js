// Login.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';

const Login = ({  navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

   
  
    navigation.navigate('KycModule'); 
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
    <ImageBackground
    source={require('../src/Images/BG.jpg')} // Replace 'your-background-image.jpg' with the actual image file
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
        <Text style={{ textAlign: 'center', color: 'black' }}>Don't have an Account ?</Text>
        <Button mode="contained" onPress={handleSignUp} style={styles.signUpbtn}>
          SignUp
        </Button>
       
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginVertical: 8,
    color: 'black'
  },
  button: {
    marginTop: 16,
  },
  signUpbtn: {

  }
});

export default Login;
