import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { HomeCardProps } from '../../types/homeCard'
import { removeDecimals } from '../../utils/removeDecimals'
import { weatherIcons } from '../../utils/weatherIcons'
import { styles } from './styles'

export const HomeCard = ({ data, ...rest }: HomeCardProps) => {
  const weatherIcon = weatherIcons(data.weather?.[0]?.icon)

  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.countryContent}>
        <Text style={styles.countryName}>{data?.name}</Text>
        <Text style={styles.countryNameSys}>{data.sys?.country}</Text>
      </View>
      <View style={styles.weatherContent}>
        {weatherIcon && (
          <Image
            style={styles.weatherIcon}
            source={weatherIcon}
            alt="Weather icon"
          />
        )}
        <Text style={styles.tempText}>{removeDecimals(data.main?.temp)}ºC</Text>
      </View>
    </RectButton>
  )
}
