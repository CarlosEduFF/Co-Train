// app/(main)/_layout.tsx
import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E53935',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="gruposMusc"
        options={{
          title: 'Grupos Musculares',
          tabBarIcon: ({ color }) => <TabBarIcon name="heartbeat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planejamentos"
        options={{
          title: 'Planejamento',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dieta"
        options={{
          title: 'Plano Alimentar',
          tabBarIcon: ({ color }) => <TabBarIcon name="heartbeat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'config',
          tabBarIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
