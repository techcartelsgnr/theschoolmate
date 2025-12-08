// firebase-messaging.js (ROOT OF PROJECT, not inside src/)

import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

/* --------------------------------------------------------
   🔥 Notifee Background Notification Tap Handler
   This runs when user taps the notification while the app 
   is KILLED or BACKGROUND.
--------------------------------------------------------- */
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.log('📲 Notifee Background TAP:', detail.notification);

    // Save tap data globally so App.jsx can navigate later
    global.backgroundNotificationData = detail?.notification?.data || null;
  }
});

/* --------------------------------------------------------
   🔥 FCM Background Handler
   Runs when a notification arrives while the app is 
   in BACKGROUND or KILLED state.
--------------------------------------------------------- */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background Message:', remoteMessage);

  // -----------------------------------------------------
  // FIX: Prevent duplicate notifications
  // If FCM includes "notification" payload → Android will 
  // auto-display it, so we DO NOT display again with Notifee.
  // -----------------------------------------------------
  if (remoteMessage.notification) {
    console.log('⚠️ Skipping Notifee display (FCM already showed notification).');
    return;
  }

  // Create a notification channel (required on Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display custom Notifee notification
  await notifee.displayNotification({
    title: remoteMessage.data?.title || '',
    body: remoteMessage.data?.body || '',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: { id: 'tap-action' },
    },
    data: remoteMessage.data,
  });
});





// // firebase-messaging.js (ROOT LEVEL FILE)
// // This file MUST NOT be inside /src

// import messaging from '@react-native-firebase/messaging';
// import notifee, { EventType } from '@notifee/react-native';

// // ------------------------------------------------------------
// // 🔥 Handle NOTIFEE background tap (app killed or in background)
// // ------------------------------------------------------------
// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   if (type === EventType.PRESS) {
//     console.log('📲 Notifee Background TAP:', detail.notification);

//     // Store notification data globally so App.jsx can navigate
//     global.backgroundNotificationData = detail?.notification?.data || null;
//   }
// });

// // ------------------------------------------------------------
// // 🔥 Firebase Cloud Messaging - Background Handler
// // ------------------------------------------------------------
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('📩 Background Message:', remoteMessage);

//   // Create channel if not exists
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   // Display notification while app is in background / killed
//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || '',
//     body: remoteMessage.notification?.body || '',
//     android: {
//       channelId,
//       smallIcon: 'ic_launcher', // make sure this icon exists
//       pressAction: { id: 'tap-action' },
//     },
//     data: remoteMessage.data, // IMPORTANT — used for navigation
//   });
// });

