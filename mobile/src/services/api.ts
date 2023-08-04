import { WEATHER_API_KEY } from '@env'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: WEATHER_API_KEY,
  },
})

export default api
