import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS, Spacing } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

// Array of categories with navigation target
const categories = [
  {
    title: 'Dashboard',
    image: require('../../../assets/homeicon/dashboard.png'),
    screen: 'DashboardScreen',
  },
  {
    title: 'Attendance',
    image: require('../../../assets/homeicon/attendancescreen.png'),
    screen: 'AttendanceScreen',
  },
  {
    title: 'Fee Details',
    image: require('../../../assets/homeicon/feescreen.png'),
    screen: 'FeesScreen',
  },
  {
    title: 'Examination',
    image: require('../../../assets/homeicon/examination.png'),
    screen: 'MarksScreen',
  },
  {
    title: 'Report Cards',
    image: require('../../../assets/homeicon/report.png'),
    screen: 'ReportCardScreen',
  },
  {
    title: 'Profile',
    image: require('../../../assets/homeicon/profilescreen.png'),
    screen: 'ProfileScreen',
  },
  {
    title: 'Notice Board',
    image: require('../../../assets/homeicon/notice.png'),
    screen: 'NoticeBoardScreen',
  },
  {
    title: 'Gallery',
    image: require('../../../assets/homeicon/gallery.png'),
    screen: 'GalleryScreen',
  },
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
  '#4cd137',
  '#e84118',
  // add more colors as needed
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.homeHeader}>
          <Image
            source={require('../../../assets/images/khushbuverma.jpg')}
            style={styles.homelogo}
            resizeMode="contain"
          />
          <View style={styles.homeHeaderRight}>
            <Text style={styles.headerRightTitle}>Welcome, Suhani Mehra</Text>
            <Text style={styles.headerRightClass}>Class 10-A</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.schoolHome}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.schoollogo}
              resizeMode="contain"
            />
            <Text style={styles.schoolTitle}>Monther's Pride School</Text>
            <Text style={styles.schoolAddress}>
              Shop Number D-16, Sector 17 Market, Sri Ganganagar, Rajasthan
            </Text>
          </View>

          <View style={styles.homeAttenBox}>
            <Text style={styles.homeAttenTitle}>Attendance SnapShot</Text>
            <Text style={styles.homeAttenPerc}>90%</Text>
          </View>

          <View style={styles.fullView}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.schoolCategory,
                  {
                    backgroundColor:
                      CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                  },
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.cateImage}>
                  <Image
                    source={item.image}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.catTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: COLORS.cardBackground,
    // height: height * 1,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.whiteBackground,
    padding: 10,
  },
  schoolHome: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  schoollogo: {
    width: 55,
    height: 55,
  },
  schoolTitle: {
    fontSize: Spacing.forteen,
    color: COLORS.textDark,
    fontFamily: 'Quicksand-Bold',
  },
  schoolAddress: {
    fontSize: Spacing.barah,
    color: COLORS.textDark,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  fullView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  schoolCategory: {
    alignItems: 'center',
    marginBottom: 10,
    width: width * 0.29,
    backgroundColor: COLORS.background,
    borderRadius: 5,
    paddingVertical: 15,
  },
  cateImage: {
    // width: 50,
    // height: 50,
    // backgroundColor: COLORS.whiteBackground,
    // borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 42,
    height: 42,
  },
  catTitle: {
    fontSize: Spacing.forteen,
    color: COLORS.textPrimary,
    fontFamily: 'Quicksand-Bold',
    marginTop: 8,
    textAlign: 'center',
  },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: COLORS.cardBackground,
  },
  homelogo: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  homeHeaderRight: { marginLeft: 10 },
  headerRightTitle: {
    fontSize: Spacing.medium,
    color: COLORS.textPrimary,
    fontFamily: 'InterTight-Bold',
  },
  headerRightClass: {
    fontSize: Spacing.medium,
    color: COLORS.textPrimary,
    fontFamily: 'Quicksand-Bold',
  },
  homeAttenBox: {
    padding: 10,
    backgroundColor: COLORS.grayBackground,
    marginBottom: 20,
  },
  homeAttenTitle: {
    fontSize: Spacing.xl,
    color: COLORS.whiteBackground,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  homeAttenPerc: {
    fontSize: Spacing.xl,
    color: COLORS.whiteBackground,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
});
