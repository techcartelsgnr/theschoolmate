import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  LoginScreen,
  OtpScreen,
  ForgotPinScreen,
} from '../screens/index/index';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPinScreen" component={ForgotPinScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
