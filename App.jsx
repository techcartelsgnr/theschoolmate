import { StyleSheet } from 'react-native';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
