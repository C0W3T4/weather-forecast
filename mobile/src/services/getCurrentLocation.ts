import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

export const getCurrentLocationModule = {
  GetLocation: async function () {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert(
        'Oops, this will not work in an Android emulator. Try it on your device!'
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
  }
};
