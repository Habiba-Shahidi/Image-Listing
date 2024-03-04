// PanUploader.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { requestStoragePermission } from './Permissions';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const PanUploader = ({ onPanMatch }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [enteredPan, setEnteredPan] = useState('');

  useEffect(() => {
    checkStoragePermission();
  }, []);

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

      setSelectedImage(imageUri);
      recognizeText(imageUri);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

//   const recognizeText = async (imageUri) => {
//     try {
//       const result = await TextRecognition.recognize(imageUri, 'en');
//       console.log('Recognized text:', result.text);

//       // Extract Pan number (assuming it's the first 12 digits)
//       const PanNumber = result.text.replace(/\D/g, '').slice(0, 12);

//       setRecognizedText(PanNumber);
//       onPanMatch(PanNumber);

//     } catch (error) {
//       console.error('Error recognizing text:', error);
//     }
//   };

  const recognizeText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri, 'en');
      console.log('Recognized text:', result.text);

      // Extract Pan number (assuming it's the first 12 digits)
      const panNumber = result.text.replace(/\D/g, '').slice(0, 12);

      setRecognizedText(panNumber);
      onMatch(panNumber);

    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };
  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter Pan Number"
        onChangeText={(text) => setEnteredPan(text)}
        value={enteredPan}
      />
      <Button title="Upload Pan Card" onPress={handleDocumentUpload} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      {recognizedText !== '' && <Text>Recognized Pan Number: {recognizedText}</Text>}
    </View>
  );
};

export default PanUploader;