import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

import {
  ArticleScreen,
  BlogScreen,
  FeedbackHistoryScreen,
  FeedbackScreen,
} from "../screens/index";

import MainStack from "../navigation/MainStack";

import { fetchSchoolInfo } from "../redux/slices/commonSlice";
import { COLORS, FontSizes } from "../theme/theme";

const Drawer = createDrawerNavigator();

// ⭐ Custom Drawer UI
function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const { schoolInfo } = useSelector((state) => state.common);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchSchoolInfo(token));
  }, [token]);

  return (
    <LinearGradient
      colors={["#4e73df", "#1cc7d0"]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      >

        {/* ⭐ TOP LOGO CARD */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoCard}>
            <Image
              source={
                schoolInfo?.logo
                  ? { uri: schoolInfo.logo }
                  : require("../../assets/images/logo.png")
              }
              style={styles.logo}
            />
          </View>

          <Text style={styles.logoText}>
            {schoolInfo?.schoolnamehindi || "School Name"}
          </Text>
        </View>

        {/* ⭐ MENU SECTION */}
        <View style={styles.menuContainer}>

          <DrawerMenuItem
            label="Home"
            onPress={() => props.navigation.navigate("Home")}
          />

          <DrawerMenuItem
            label="Blog"
            onPress={() => props.navigation.navigate("Blog")}
          />

          <DrawerMenuItem
            label="Article"
            onPress={() => props.navigation.navigate("Article")}
          />

          <DrawerMenuItem
            label="Feedback"
            onPress={() => props.navigation.navigate("Feedback")}
          />

          <DrawerMenuItem
            label="Feedback History"
            onPress={() => props.navigation.navigate("FeedbackHistoryScreen")}
          />

        </View>

        {/* ⭐ LOGOUT BUTTON */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => dispatch(logout({ token: null }))}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    </LinearGradient>
  );
}

/**
 * 🎨 Drawer Menu Button (Reusable)
 */
const DrawerMenuItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["#ffffff55", "#ffffff22"]}
        style={styles.menuItem}
      >
        <Text style={styles.menuText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 270, backgroundColor: "transparent" },
      }}
    >
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="Blog" component={BlogScreen} />
      <Drawer.Screen name="Article" component={ArticleScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="FeedbackHistoryScreen" component={FeedbackHistoryScreen} />
    </Drawer.Navigator>
  );
}

/* ------------------- STYLES ------------------- */

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff55",
  },

  logoCard: {
    backgroundColor: "#ffffffdd",
    padding: 10,
    borderRadius: 80,
    elevation: 4,
    
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  logoText: {
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: FontSizes.normal,
    fontFamily: "InterTight-Bold",
    color: "#fff",
  },

  icon: {
    fontSize: 20,
    marginRight: 15,
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 0,
  },

  menuItem: {
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
  },

  menuText: {
    fontSize: FontSizes.small,
    fontFamily: "Quicksand-Bold",
    paddingVertical: 10,
    color: "#ffffff",
  },

  bottomContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#ffffff55",
  },
  logoutButton: {
    paddingVertical: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: FontSizes.normal,
    fontFamily: "Quicksand-Bold",
  },
});
