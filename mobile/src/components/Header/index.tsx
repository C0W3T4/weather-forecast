import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { theme } from '../../global/styles/theme';
import { HeaderProps } from '../../types/header';
import { StackNavigation } from '../../types/navigation';
import { styles } from './styles';

export const Header = ({ title, emoji, setHome, subtitle }: HeaderProps) => {
  const { navigate } = useNavigation<StackNavigation>();

  function handleGoBack(): void {
    navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerLeftContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.headerRightContent}>
        {emoji &&
          <Text style={styles.emoji}>
            😄
          </Text>
        }
        {setHome &&
          <FontAwesome5
            name="home"
            size={24}
            color={theme.colors.homeIcon_color}
            style={styles.homeIcon}
            onPress={handleGoBack}
          />
        }
      </View>
    </View>
  );
}
