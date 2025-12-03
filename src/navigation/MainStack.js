import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../navigation/TabRoutes';
import {
  ArticleDetailScreen,
  ArticleScreen,
  BlogDetailScreen,
  BlogScreen,
  EditProfileScreen,
  EventsDetailScreen,
  EventsScreen,
  FeesScreen,
  GalleryScreen,
  MarksScreen,
  NoticeBoardScreen,
  NotificationScreen,
  SchoolInfoScreen,
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
      <Stack.Screen name="NoticeBoardScreen" component={NoticeBoardScreen} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="EventsDetailScreen" component={EventsDetailScreen} />
      <Stack.Screen name="SchoolInfoScreen" component={SchoolInfoScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
