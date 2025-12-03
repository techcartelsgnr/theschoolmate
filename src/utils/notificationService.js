import {Alert, Platform} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import notifee, {EventType} from '@notifee/react-native';
import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';

import {navigate} from '../contants/NavigationService';
import {notificationOpenedRef} from './AppState';

// 🔔 Register all notification listeners
export const registerNotificationListeners = () => {
  const app = getApp();
  const messaging = getMessaging(app);

  // 1️⃣ Foreground notification received
  onMessage(messaging, async remoteMessage => {
    console.log('📩 Foreground FCM Message:', remoteMessage);
    await displayNotification(remoteMessage); // Show local notification
    
  });

  // 2️⃣ Foreground tap on local notification
  notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS && detail.pressAction?.id === 'tap-action') {
      const data = detail.notification?.data;
      console.log('👉 User tapped foreground notification:', data);

      if (data?.screen) {
        handleNavigation({data}); // Wrap in mock remoteMessage
      }
    }
  });

  // 3️⃣ Background: Notification opened from background
  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log(
      '📩 Opened app from background via notification:',
      remoteMessage,
    );
    Alert.alert(remoteMessage);
    handleNavigation(remoteMessage);
  });

  // 4️⃣ Cold Start: App opened from killed state
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage && !notificationOpenedRef.handledInitialNotification) {
      console.log(
        '📩 App opened from killed state via notification:',
        remoteMessage,
      );

      handleNavigation(remoteMessage);

      const {data} = remoteMessage;
      notificationOpenedRef.openedFromNotification = true;
      notificationOpenedRef.targetScreen = data?.screen || '';
      notificationOpenedRef.targetParams = {...data};
      notificationOpenedRef.handledInitialNotification = true;
    }
  });
};

// 🔔 Display notification manually (used in foreground)
const displayNotification = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'New Notification',
    body: remoteMessage.notification?.body || '',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // 🟢 Make sure this exists
      pressAction: {
        id: 'tap-action', // Used for foreground tap handling
      },
    },
    data: remoteMessage.data || {}, // Pass full payload
  });
};

// 🔀 Central navigation handler
const handleNavigation = remoteMessage => {
  const data = remoteMessage?.data || {};
  const screen = data.screen;

  console.log('🔀 Navigating based on data:', screen);

  switch (screen) {
    case "Notifications":
      navigate('Notifications');
      break;

    // case "NotificationsScreen":
    //      navigate('laboratoryScreen', {
    //     screen: 'NotificationsScreen'
    //   });
    //   break;
     
    // case 'news':
    // case 'HomeScreen':
    //   navigate('NewsDetails', {id: data.id});
    //   break;

    // case 'OrderDetails':
    // case 'order':
    //   navigate('OrderDetails', {orderId: data.order_id});
    //   break;

    default:
      navigate('Notifications');
      break;
  }
};
