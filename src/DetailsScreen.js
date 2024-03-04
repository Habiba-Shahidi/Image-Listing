import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const DetailsScreen = props => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);

  const [serverResponse, setServerResponse] = useState(null);

  const validateInputs = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      setFirstNameError(null);
    }

    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      setLastNameError(null);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError(null);
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneNumberError(null);
    }

    return isValid;
  };

  const handleFormSubmit = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phoneNumber);
      formData.append('user_image', {
        uri: props.route.params.item.imageUrl,
        type: 'image/jpeg',
        name: 'user_image.jpg',
      });

      const response = await axios.post(
        'http://dev3.xicom.us/xttest/savedata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setServerResponse(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleOkPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
          {serverResponse ? (
            <View style={styles.responseCard}>
              <Text style={styles.responseText}>{serverResponse}</Text>
              <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image
                source={{uri: props.route.params.item.imageUrl}}
                style={styles.image}
              />

              <Text style={styles.EmailText}>First Name</Text>
              <View style={[styles.input, firstNameError && styles.inputError]}>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="black"
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                  style={styles.textInputText}
                />
              </View>
              {firstNameError && (
                <Text style={styles.errorText}>{firstNameError}</Text>
              )}

              <Text style={styles.EmailText}>Last Name</Text>
              <View style={[styles.input, lastNameError && styles.inputError]}>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="black"
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                  style={styles.textInputText}
                />
              </View>
              {lastNameError && (
                <Text style={styles.errorText}>{lastNameError}</Text>
              )}

              <Text style={styles.EmailText}>Email</Text>
              <View style={[styles.input, emailError && styles.inputError]}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  style={styles.textInputText}
                />
              </View>
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}

              <Text style={styles.EmailText}>Phone Number</Text>
              <View
                style={[styles.input, phoneNumberError && styles.inputError]}>
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="black"
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                  keyboardType="phone-pad"
                  style={styles.textInputText}
                  maxLength={10}
                />
              </View>
              {phoneNumberError && (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              )}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleFormSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  EmailText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1.5,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#021983',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  responseCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  responseText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  textInputText: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
});
