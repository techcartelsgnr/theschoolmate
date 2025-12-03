import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';

import { requestNotificationPermission } from './src/utils/requestPermissions';
import { registerNotificationListeners } from './src/utils/notificationService';

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';

import { chkLogin } from './src/redux/slices/authSlice';

// -------------------------
// App Navigation Controller
// -------------------------
function AppNavigator() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Restore login session
  useEffect(() => {
    dispatch(chkLogin());
  }, []);

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// -------------------------
// MAIN APP ENTRY
// -------------------------
export default function App() {

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    registerNotificationListeners();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
