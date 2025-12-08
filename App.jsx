// MUST BE FIRST – registers FCM background handlers
import './firebase-messaging';

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';

import { requestNotificationPermission } from './src/utils/requestPermissions';
import { registerNotificationListeners, navigateByNotificationType } from './src/utils/notificationService';

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';

import { chkLogin } from './src/redux/slices/authSlice';

// ⭐ ADD THIS
import {
  navigationRef,
  processPendingNavigation,
} from './src/contants/NavigationService';

// ⭐ DEEP LINKING
const linking = {
  prefixes: ['theschoolmate://'],
  config: {
    screens: {
      BlogScreen: 'blog/:blog_id',
      EventsScreen: 'event/:event_id',
      NotificationScreen: 'notifications',
    },
  },
};

function AppNavigator() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    dispatch(chkLogin());
  }, []);

  // ⭐ If app opened from Notifee background tap
  useEffect(() => {
    if (global.backgroundNotificationData) {
      const data = global.backgroundNotificationData;
      global.backgroundNotificationData = null;

      console.log('🔄 Navigating from background tap:', data);
      navigateByNotificationType(data);
    }
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}                  // ⭐ REQUIRED FOR queued navigation
      onReady={() => {
        processPendingNavigation();         // ⭐ Flush queued navigation calls
      }}
    >
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    requestNotificationPermission();   // FCM permission + token
    registerNotificationListeners();   // Foreground + background open
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
