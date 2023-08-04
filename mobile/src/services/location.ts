import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

export const getCurrentLocationService = async () => {
  if (Platform.OS === 'android' && !Device.isDevice) {
    Alert.alert(
      'This will not work in an Android emulator. Try it on your device!'
    );
    return;
  }

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission to access location was denied'
      );
      return;
    }

    const coords = await Location.getCurrentPositionAsync({});
    return coords;
  } catch (error) {
    throw error;
  }
};
