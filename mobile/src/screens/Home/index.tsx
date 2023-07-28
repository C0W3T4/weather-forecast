import { WEATHER_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, View } from 'react-native';
import { Header } from '../../components/Header';
import { HomeCard } from '../../components/HomeCard';
import { LoadAnimation } from '../../components/LoadAnimation';
import api from '../../services/api';
import { getCurrentLocationModule } from '../../services/getCurrentLocation';
import { allGetCalls } from '../../services/setGetCalls';
import { StackNavigation } from '../../types/navigation';
import { WeatherProps } from '../../types/weather';
import { styles } from './styles';

export function Home() {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject>();

  const [locationWeatherData, setLocationWeatherData] = useState<WeatherProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const { navigate } = useNavigation<StackNavigation>();

  function handleSelectedCityWeather(weatherInfo: WeatherProps): void {
    navigate('WeatherDescription', { weatherInfo });
  }

  async function getCurrentLocation(): Promise<void> {
    setCurrentLocation(await getCurrentLocationModule.GetLocation());
  }

  async function fetchWeatherData(): Promise<void> {
    const currentLocationData = `/weather?lat=${currentLocation?.coords?.latitude}&lon=${currentLocation?.coords?.longitude}&units=metric&appid=${WEATHER_API_KEY}`;

    await Promise.all([
      api.get(currentLocationData),
      api.get(allGetCalls.lisbonData),
      api.get(allGetCalls.madridData),
      api.get(allGetCalls.parisData),
      api.get(allGetCalls.berlinData),
      api.get(allGetCalls.copenhagenData),
      api.get(allGetCalls.romeData),
      api.get(allGetCalls.londonData),
      api.get(allGetCalls.dublinData),
      api.get(allGetCalls.pragueData),
      api.get(allGetCalls.viennaData),
    ]).then(
      responses => Promise.all(responses.map((response) => response.data))
    ).then(data => {
      if (!data) {
        return setLoading(true);
      }

      setLocationWeatherData(data);

      setLoading(false);
    }).catch(error => Alert.alert(error));
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation?.coords?.latitude && currentLocation?.coords?.longitude) {
      fetchWeatherData();
    }
  }, [currentLocation]);

  if (loading) {
    return <LoadAnimation />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header
          title="Hello"
          subtitle="See how the weather is."
          emoji={true}
        />
      </View>
      <View style={styles.cityWeatherContent}>
        <FlatList
          data={locationWeatherData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HomeCard
              data={item}
              onPress={() => handleSelectedCityWeather(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
}