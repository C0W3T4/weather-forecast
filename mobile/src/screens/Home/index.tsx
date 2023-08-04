import { useNavigation } from '@react-navigation/native'
import { AxiosResponse } from 'axios'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, View } from 'react-native'
import { Header } from '../../components/Header'
import { HomeCard } from '../../components/HomeCard'
import { LoadAnimation } from '../../components/LoadAnimation'
import api from '../../services/api'
import { getCurrentLocationService } from '../../services/location'
import { StackNavigation } from '../../types/navigation'
import { WeatherProps } from '../../types/weather'
import { styles } from './styles'

export function Home() {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>()

  const [locationWeatherData, setLocationWeatherData] = useState<
    WeatherProps[]
  >([])

  const [loading, setLoading] = useState<boolean>(true)

  const { navigate } = useNavigation<StackNavigation>()

  function handleSelectedCityWeather(weatherInfo: WeatherProps): void {
    navigate('WeatherDescription', { weatherInfo })
  }

  async function getCurrentLocation(): Promise<void> {
    setCurrentLocation(await getCurrentLocationService())
  }

  async function fetchWeatherData(): Promise<void> {
    await Promise.all([
      api.get('/weather', {
        params: {
          lat: currentLocation?.coords?.latitude,
          lon: currentLocation?.coords?.longitude,
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Lisbon',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Madrid',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Paris',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Berlin',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Copenhagen',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Rome',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'London',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Dublin',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Prague',
          units: 'metric',
        },
      }),
      api.get('/weather', {
        params: {
          q: 'Vienna',
          units: 'metric',
        },
      }),
    ])
      .then((responses) =>
        responses.map(
          (response: AxiosResponse<WeatherProps, unknown>) => response.data,
        ),
      )
      .then((data) => {
        if (!data) {
          return setLoading(true)
        }

        setLocationWeatherData(data)

        setLoading(false)
      })
      .catch(() => Alert.alert("Couldn't get weather data!"))
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (
      currentLocation?.coords?.latitude &&
      currentLocation?.coords?.longitude
    ) {
      fetchWeatherData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation])

  if (loading) {
    return <LoadAnimation />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header title="Hello" subtitle="See how the weather is." emoji={true} />
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
  )
}
