import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { WeatherDescription } from '../screens/WeatherDescription';
import { StackParamList } from '../types/navigation';

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="WeatherDescription" component={WeatherDescription} />
    </Navigator>
  );
}