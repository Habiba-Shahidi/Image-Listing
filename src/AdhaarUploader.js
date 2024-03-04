// AdhaarUploader.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { requestStoragePermission } from './Permissions';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Button, Snackbar, TextInput as PaperTextInput } from 'react-native-paper';

const AdhaarUploader = ({ onAdhaarMatch }) => {
  const [name, setName] = useState('');
  const [selectedAadhaarImage, setSelectedAadhaarImage] = useState(null);
  const [recognizedAadhaar, setRecognizedAadhaar] = useState('');
  const [enteredAadhaar, setEnteredAadhaar] = useState('');
  const [aadhaarResult, setAadhaarResult] = useState('');
  const [selectedPanImage, setSelectedPanImage] = useState(null);
  const [recognizedPan, setRecognizedPan] = useState('');
  const [enteredPan, setEnteredPan] = useState('');
  const [panResult, setPanResult] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    checkStoragePermission();
  }, []);

  useEffect(() => {
 
    if (enteredAadhaar.trim() !== '') {
      recognizeText(selectedAadhaarImage);
    }
  }, [enteredAadhaar, selectedAadhaarImage]);

  useEffect(() => {
    if (enteredPan.trim() !== '') {
      recognizePanText(selectedPanImage);
    }
  }, [enteredPan, selectedPanImage]);

  const checkStoragePermission = async () => {
    await requestStoragePermission();
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('Selected document ', result);
      const imageUri = result[0].uri;

      setSelectedAadhaarImage(imageUri);
      recognizeText(imageUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const recognizeText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri, 'en');
      console.log('Recognized text:', result.text);

      // Extract Aadhaar number using a more precise regular expression
      const aadhaarNumberMatch = result.text.match(/(\b\d{4}[-.\s]?\d{4}[-.\s]?\d{4}\b)|(\b\d{12}\b)/);

      //const recognizedAadhaarNumber = aadhaarNumberMatch ? aadhaarNumberMatch[0] : '';
      const recognizedAadhaarNumber = aadhaarNumberMatch ? aadhaarNumberMatch[0].replace(/\s/g, '') : '';

      setRecognizedAadhaar(recognizedAadhaarNumber);

      // Check if the entered Aadhaar number matches the recognized Aadhaar number
      if (enteredAadhaar === recognizedAadhaarNumber) {
        setAadhaarResult('Verified');
      } else {
        setAadhaarResult('Not Verified');
      }
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  const handlePanUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('Selected document ', result);
      const imagePanUri = result[0].uri;

      setSelectedPanImage(imagePanUri);
      recognizePanText(imagePanUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const recognizePanText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri, 'en');
      console.log('Recognized text:', result.text);

      // Extract Pan number using a more precise regular expression
      const panNumberMatch = result.text.match(/[A-Z]{5}[0-9]{4}[A-Z]/);

      //const recognizedPanNumber = panNumberMatch ? panNumberMatch[0] : '';
      const recognizedPanNumber = panNumberMatch ? panNumberMatch[0].replace(/\s/g, '') : '';

      setRecognizedPan(recognizedPanNumber);

      if (enteredPan === recognizedPanNumber) {
        setPanResult('Verified');
      } else {
        setPanResult('Not Verified');
      }
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  const handleSubmit = () => {
    // Basic validations, enhance as needed
    if (!name || !enteredAadhaar || !enteredPan) {
      alert('Please fill in all fields');
      return;
    }

    // Check if Aadhaar and Pan are verified
    if (aadhaarResult === 'Not Verified' || panResult === 'Not Verified') {
      alert('Aadhaar and Pan verification failed');
      return;
    }

   
    setSnackbarVisible(true);

    setName('');
    setEnteredAadhaar('');
    setEnteredPan('');
    setSelectedAadhaarImage(null);
    setSelectedPanImage(null);
    setRecognizedAadhaar('');
    setRecognizedPan('');
    setAadhaarResult('');
    setPanResult('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <PaperTextInput
          label="Enter Name"
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />
        <PaperTextInput
          label="Enter Aadhaar Number"
          style={styles.input}
          onChangeText={text => setEnteredAadhaar(text)}
          value={enteredAadhaar}
        />
        <Button mode="contained" onPress={handleDocumentUpload} style={styles.button}>
          Upload Aadhaar
        </Button>

        {selectedAadhaarImage && (
          <Image
            source={{ uri: selectedAadhaarImage }}
            style={styles.image}
          />
        )}
        {recognizedAadhaar !== '' && (
          <Text>Recognized Aadhaar Number: {recognizedAadhaar}</Text>
        )}
        {recognizedAadhaar !== '' && <Text>{aadhaarResult}</Text>}

        <PaperTextInput
          label="Enter Pan Number"
          style={styles.input}
          onChangeText={text => setEnteredPan(text)}
          value={enteredPan}
        />
        <Button mode="contained" onPress={handlePanUpload} style={styles.button}>
          Upload Pan
        </Button>

        {selectedPanImage && (
          <Image
            source={{ uri: selectedPanImage }}
            style={styles.image}
          />
        )}
        {recognizedPan !== '' && (
          <Text>Recognized Pan Number: {recognizedPan}</Text>
        )}
        {recognizedPan !== '' && <Text>{panResult}</Text>}

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} 
      >
        Form submitted successfully!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginVertical: 8,
    // backgroundColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    marginTop: 16,
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
  },
});

export default AdhaarUploader;
