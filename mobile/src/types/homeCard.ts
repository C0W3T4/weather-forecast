import { RectButtonProps } from 'react-native-gesture-handler'

export interface HomeCardProps extends RectButtonProps {
  data: {
    weather?: [
      {
        icon?: string
      },
    ]
    main?: {
      temp?: number
    }
    sys?: {
      country?: string
    }
    name?: string
  }
}
