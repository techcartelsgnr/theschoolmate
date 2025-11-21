import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, Spacing } from '../theme/theme';
import {
  AttendanceScreen,
  HomeScreen,
  MarksScreen,
  ProfileScreen,
} from '../screens/index';

// Screens

const Tab = createBottomTabNavigator();

// -------------------- Bottom Tabs --------------------
export default function TabRoutes() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.error,
        tabBarInactiveTintColor: COLORS.background,
        tabBarStyle: {
          // backgroundColor: COLORS.whiteBackground,
          // borderTopColor: COLORS.blue,
          paddingTop: 2,
          paddingBottom: 5 + insets.bottom,
          height: 56 + insets.bottom,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontFamily: 'Quicksand-Bold',
          fontSize: Spacing.tabsize,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/hometab1.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/attendancefill.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Marks"
        component={MarksScreen}
        options={{
          tabBarLabel: 'Marks',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/marksfill.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/profiletab.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  hometabFirst: { height: 22, width: 22 },
});
