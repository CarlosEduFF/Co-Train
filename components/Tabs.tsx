
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '../constants/colors';
import { routes } from '~/constants/routes';


const tabs = [

  {
    label: 'Treinos',
    route: routes.gruposMusc,
    Icon: MaterialCommunityIcons,
    iconName: 'arm-flex-outline',
  },
  {
    label: 'Semanal',
    route: routes.plane,
    Icon: MaterialIcons,
    iconName: 'event-note',
  },
  {
    label: 'Dieta',
    route: routes.dieta,
    Icon: FontAwesome5,
    iconName: 'apple-alt',
  },
  {
    label: 'Configurações',
    route: routes.config,
    Icon: Feather,
    iconName: 'settings',
  },
];

export default function TabLayout() {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map(({ label, route, Icon, iconName }) => {
        const isActive = pathname.startsWith(route);
        return (
          <TouchableOpacity
            key={route}
            style={styles.button}
            onPress={() => router.push(route)} // já é o caminho correto
          >

            <Icon
              name={iconName}
              size={24}
              color={isActive ? colors.VermClaro : colors.vermEscuro}
            />
            <Text style={[styles.text, isActive && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.white,
    borderColor: colors.Vermelho,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 14,
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  activeText: {

  }
});