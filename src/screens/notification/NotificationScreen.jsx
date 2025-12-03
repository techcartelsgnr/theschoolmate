import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme/theme";

const NotificationScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);

  // 🔔 Sample Notifications (replace with API later)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "School Holiday",
      message: "School will remain closed tomorrow due to heavy rainfall.",
      time: "2 hrs ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Exam Schedule",
      message: "Term-1 examination schedule has been updated.",
      time: "Yesterday",
      isRead: true,
    },
    {
      id: 3,
      title: "Fee Reminder",
      message: "Please pay the monthly fee before 10th March.",
      time: "2 days ago",
      isRead: false,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      // here you can call API → fetchNotifications()
      setRefreshing(false);
    }, 600);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, !item.isRead && styles.unreadCard]}>
      <View style={styles.notificationIcon}>
        <Ionicons
          name={item.isRead ? "notifications-outline" : "notifications"}
          size={22}
          color={COLORS.cardBackground}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* LIST */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.cardBackground]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No Notifications Found</Text>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

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
    fontSize: 18,
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
    borderLeftColor: COLORS.cardBackground,
  },

  notificationIcon: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.grayBackground,
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

  time: {
    marginTop: 4,
    fontSize: 11,
    color: "#888",
    fontFamily: "InterTight-Medium",
  },

  /** EMPTY BOX **/
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#999",
    fontFamily: "Quicksand-Bold",
  },
});

export default NotificationScreen;
