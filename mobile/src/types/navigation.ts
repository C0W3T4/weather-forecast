import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Home: any;
  WeatherDescription: any;
};

export type BottomTabParamList = {};

export type StackNavigation = StackNavigationProp<StackParamList>;

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>;
