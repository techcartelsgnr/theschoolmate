import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Spacing } from '../../theme/theme';

export default function ProfileScreen({ navigation }) {
  const user = {
    name: 'Yogita Shaje',
    classSection: 'Class VII B',
    profileImage: require('../../../assets/images/khushbuverma.jpg'),
    rollNumber: '0175',
    dob: '10 Oct 1996',
    bloodGroup: 'B+',
    emergencyContact: '+91 9812345678',
    position: '12th',
    fatherName: 'Mr. Raj Shaje',
    motherName: 'Mrs. Priya Shaje',
  };

  const infoRows = [
    { label: 'Roll Number', value: user.rollNumber },
    { label: 'Date of Birth', value: user.dob },
    { label: 'Blood Group', value: user.bloodGroup },
    {
      label: 'Emergency Contact',
      value: (
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(`tel:${user.emergencyContact}`)}
        >
          {user.emergencyContact}
        </Text>
      ),
    },
    { label: 'Position in Class', value: user.position },
    { label: "Father's Name", value: user.fatherName },
    { label: "Mother's Name", value: user.motherName },
  ];

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.headerAtten}>
          <TouchableOpacity
            style={styles.backButtonAtten}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitleAtten}>Kid Profile</Text>

          <View style={{ width: '15%' }} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.avatarContainer}>
            <Image source={user.profileImage} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.classSection}>{user.classSection}</Text>
          </View>

          <View style={styles.infoBox}>
            {infoRows.map((item, idx) => (
              <InfoRow
                key={item.label}
                label={item.label}
                value={item.value}
                isLastRow={idx === infoRows.length - 1}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ask for Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function InfoRow({ label, value, isLastRow }) {
  return (
    <View
      style={[
        styles.row,
        isLastRow && {
          borderBottomWidth: 0,
          borderBottomColor: 'transparent',
          paddingBottom: 0,
        },
      ]}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  headerAtten: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 1,
  },
  backButtonAtten: { padding: 4 },
  headerTitleAtten: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },
  container: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  classSection: {
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    marginBottom: 8,
    fontSize: Spacing.medium,
  },
  infoBox: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
    shadowColor: '#5732b822',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayBG,
  },
  rowLabel: {
    color: '#150000ff',
    fontFamily: 'Quicksand-Bold',
    fontSize: Spacing.forteen,
    width: '48%',
  },
  rowValue: {
    color: COLORS.secondaryGradientStart,
    fontFamily: 'InterTight-Medium',
    fontSize: Spacing.forteen,
    width: '48%',
    textAlign: 'right',
  },
  link: {
    color: COLORS.secondaryGradientStart,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#ff4e76',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 50,
    alignSelf: 'center',
    marginTop: 8,
    width: '92%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
