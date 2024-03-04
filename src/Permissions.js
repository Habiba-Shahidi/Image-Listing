// permissions.js
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestStoragePermission = async () => {
  const storagePermission =
    Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;

  try {
    const result = await check(storagePermission);

    if (result === RESULTS.GRANTED) {
      console.log('Storage permission already granted');
    } else {
      const permissionResult = await request(storagePermission);
      if (permissionResult === RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    }
  } catch (error) {
    console.error('Error checking/requesting storage permission:', error);
  }
};
