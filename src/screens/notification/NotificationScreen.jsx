import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FontSizes } from "../../theme/theme";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  clearUnreadCount,
} from "../../redux/slices/commonSlice";

export default function NotificationScreen({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const notifications = useSelector((state) => state.common.notifications);
  const loading = useSelector((state) => state.common.notificationsLoading);

  const [refreshing, setRefreshing] = useState(false);

  // 🔥 Auto-load when screen opens
  useEffect(() => {
    if (token) {
      dispatch(fetchNotifications(token));
      dispatch(clearUnreadCount()); // clear badge
    }
  }, []);

  // 🔄 Pull To Refresh
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchNotifications(token)).finally(() => setRefreshing(false));
  };

  // 🔔 Render Each Notification
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, item.isNew && styles.unreadCard]}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View style={styles.notificationIcon}>
        <Ionicons
          name={item.isNew ? "notifications" : "notifications-outline"}
          size={22}
          color={COLORS.whiteBackground}
        />
      </View>

      {/* Main Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.message}>{item.message}</Text>

        {/* Attachment Image */}
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.attachmentImage} />
        )}

        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* NOTIFICATION LIST */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.cardBackground]}
          />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="notifications-off-outline"
                size={60}
                color="#ccc"
              />
              <Text style={styles.emptyText}>No Notifications Found</Text>
            </View>
          )
        }
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 20,
          paddingTop: 10,
        }}
      />
    </SafeAreaView>
  );
}

/* ---------------------------------------------------------
   STYLES
--------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: FontSizes.normal,
    color: COLORS.textDark,
    fontFamily: "Quicksand-Bold",
  },

  /** NOTIFICATION CARD **/
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },

  unreadCard: {
    backgroundColor: "#eef6ff",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondaryGradientStart,
  },

  notificationIcon: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryGradientStart,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontFamily: "Quicksand-Bold",
    color: COLORS.textDark,
  },

  message: {
    fontSize: 13,
    color: COLORS.textDark,
    fontFamily: "InterTight-Medium",
    marginTop: 2,
  },

  attachmentImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#ddd",
  },

  time: {
    marginTop: 6,
    fontSize: 11,
    color: "#777",
    fontFamily: "InterTight-Medium",
  },

  /** EMPTY LIST **/
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  emptyText: {
    marginTop: 10,
    fontSize: FontSizes.small,
    color: "#999",
    fontFamily: "Quicksand-Bold",
  },
});
