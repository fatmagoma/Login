import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersScreen from '../screens/Users';
import AlbumsScreen from '../screens/Albums';
import { Ionicons } from '@expo/vector-icons';

type TabParamList = {
  Users: { loginData?: any };
  Albums: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs({ route }: any) {
  const { loginData } = route.params || {};

  return (
    <Tab.Navigator id="main-tabs" {...(undefined as any)}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Users' ? 'people' : 'albums';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Users" component={UsersScreen} initialParams={{ loginData }} />
      <Tab.Screen name="Albums" component={AlbumsScreen} />
    </Tab.Navigator>
  );
}
