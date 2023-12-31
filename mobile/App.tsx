// eslint-disable-next-line camelcase
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather'
// eslint-disable-next-line camelcase
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Poppins_700Bold,
    // eslint-disable-next-line camelcase
    Merriweather_400Regular,
  })

  const prepare = async () => await SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Routes />
    </GestureHandlerRootView>
  )
}
