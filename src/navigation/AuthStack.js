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
    <>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPinScreen" component={ForgotPinScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </>
  );
};

export default AuthStack;
