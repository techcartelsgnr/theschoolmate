import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../navigation/TabRoutes';
import {
  EditProfileScreen,
  FeesScreen,
  GalleryScreen,
  MarksScreen,
} from '../screens/index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="FeesScreen" component={FeesScreen} />
      <Stack.Screen name="MarksScreen" component={MarksScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
