import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS, FontSizes } from '../../theme/theme';
import { useSelector, useDispatch } from "react-redux";
import Slider from '../../components/Slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchSchoolInfo } from "../../redux/slices/commonSlice";

const { width, height } = Dimensions.get('window');

// Home categories
const categories = [
  { title: 'Activities', image: require('../../../assets/homeicon/attendancescreen.png'), screen: 'ActivitiesScreen' },
  { title: 'Fee Details', image: require('../../../assets/homeicon/feescreen.png'), screen: 'FeesScreen' },
  // { title: 'Report Cards', image: require('../../../assets/homeicon/report.png'), screen: 'ReportCardScreen' },
  // { title: 'Profile', image: require('../../../assets/homeicon/profilescreen.png'), screen: 'ProfileScreen' },
  { title: 'Notice Board', image: require('../../../assets/homeicon/notice.png'), screen: 'NoticeBoardScreen' },
  { title: 'Gallery', image: require('../../../assets/homeicon/gallery.png'), screen: 'GalleryScreen' },
  { title: 'Blog', image: require('../../../assets/homeicon/blog.png'), screen: 'BlogScreen' },
  { title: 'Article', image: require('../../../assets/homeicon/article.png'), screen: 'ArticleScreen' },
  { title: 'Events', image: require('../../../assets/homeicon/event.png'), screen: 'EventsScreen' },
  { title: 'School Info', image: require('../../../assets/homeicon/information.png'), screen: 'SchoolInfoScreen' },
  // { title: 'Feedback History', image: require('../../../assets/homeicon/examination.png'), screen: 'FeedbackHistoryScreen' },
];

const CATEGORY_COLORS = [
  '#c06600ff',
  '#033ca7ff',
  '#009b31ff',
  '#83059cff',
  '#9c8200ff',
  '#0006baff',
  '#00966cff',
  '#ff0000ff',
  '#e84118',
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { name, studentclass, section, image } = useSelector(state => state.auth);

  const [exitModal, setExitModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const unread = useSelector(state => state.common.unreadCount);

  useEffect(() => {
    if (token) {
      dispatch(fetchSchoolInfo(token));
    }
  }, [token]);

  // 🔥 Handle Back Button Press (show exit modal)
  useEffect(() => {
    const backAction = () => {
      setExitModal(true);
      return true; // block default back
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
    }, [unread])
  );

  const exitApp = () => {
    setExitModal(false);
    BackHandler.exitApp();
  };

  const cancelExit = () => {
    setExitModal(false);
  };

  const onRefresh = () => {
    setRefreshing(true);

    // wait a little to mimic reloading
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.homeHeader}>
          <View style={styles.homeLeftHeader}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {/* <Ionicons name="menu" size={32} color="#fff" style={{ marginRight: 12 }} /> */}
              <Image style={styles.menuImage} source={require('../../../assets/homeicon/menu.png')} />
            </TouchableOpacity>
            <Image source={{ uri: image }} style={styles.homelogo} resizeMode="contain" />
            <View style={styles.homeHeaderRight}>
              <Text style={styles.headerRightTitle}>Welcome, {name}</Text>
              <Text style={styles.headerRightClass}>{studentclass} - {section}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
            <View style={{ position: "relative" }}>
              <Ionicons name="notifications" size={28} color="#fff" />

              {unread > 0 && (
                <View
                  style={{
                    position: "absolute",
                    right: -4,
                    top: -3,
                    backgroundColor: "red",
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                    {unread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.success]}
            />
          }
        >
          <View style={{ marginBottom: 20 }}>
            <Slider />
          </View>


          {/* Attendance Box */}
          {/* <View style={styles.homeAttenBox}>
            <Text style={styles.homeAttenTitle}>Attendance SnapShot</Text>
            <Text style={styles.homeAttenPerc}>90%</Text>
          </View> */}

          {/* Category Grid */}
          <View style={styles.fullView}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.schoolCategory,
                  { backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] },
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.cateImage}>
                  <Image source={item.image} style={styles.logo} resizeMode="contain" />
                </View>
                <Text style={styles.catTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 🔥 EXIT CONFIRMATION MODAL */}
      <Modal transparent animationType="fade" visible={exitModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Exit App</Text>
            <Text style={styles.modalMessage}>Are you sure you want to exit?</Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelExit}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.exitButton]} onPress={exitApp}>
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 50
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.whiteBackground,
    padding: 10
  },

  // HEADER
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: COLORS.cardBackground,
  },
  homeLeftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage:{
    width: 35,
    height: 35,
    marginRight: 10,
  },
  homelogo: {
    width: 40,
    height: 40,
    borderRadius: 100,
    elevation: 1,
  },
  homeHeaderRight: {
    marginLeft: 10
  },
  headerRightTitle: {
    fontSize: FontSizes.small,
    color: COLORS.textPrimary,
    fontFamily: 'Quicksand-Bold'
  },
  headerRightClass: {
    fontSize: FontSizes.small,
    color: COLORS.textPrimary,
    fontFamily: 'Quicksand-Bold'
  },

  homeAttenBox: {
    padding: 10,
    backgroundColor: COLORS.grayBackground,
    marginBottom: 20
  },
  homeAttenTitle: {
    fontSize: FontSizes.xxl,
    color: COLORS.whiteBackground,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center'
  },
  homeAttenPerc: {
    fontSize: FontSizes.xxl,
    color: COLORS.whiteBackground,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center'
  },

  fullView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  schoolCategory: {
    alignItems: 'center',
    marginBottom: 10,
    width: width * 0.29,
    borderRadius: 5,
    paddingVertical: 15
  },
  logo: {
    width: 42,
    height: 42
  },
  catTitle: {
    fontSize: FontSizes.small,
    color: COLORS.whiteBackground,
    fontFamily: 'Quicksand-Bold',
    marginTop: 8,
    textAlign: 'center',
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 14,
    elevation: 8,
  },
  modalTitle: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: FontSizes.normal,
    fontFamily: 'InterTight-Medium',
    color: COLORS.textDark,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: COLORS.grayBG
  },
  exitButton: {
    backgroundColor: '#ff4e76'
  },
  modalButtonText: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold'
  },
  marqueeContainer: {
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    marginBottom: 20,
  },
  marqueeText: {
    fontSize: FontSizes.normal,
    color: '#0277bd',
    fontWeight: '600',
  },
});
