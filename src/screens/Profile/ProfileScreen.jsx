import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Spacing } from '../../theme/theme';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/slices/authSlice';

export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const {
    name,
    studentclass,
    section,
    image,
    dob,
    bloodGroup,
    fathername,
    mothername,
    rollnumber,
    emergencynumber,
    mobile,
    email,
  } = useSelector(state => state.auth);

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout({ token }));
  };

  const infoRows = [
    { label: "Roll Number", value: rollnumber },
    { label: "Date of Birth", value: dob },
    { label: "Blood Group", value: bloodGroup },
    {
      label: "Emergency Contact",
      value: (
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(`tel:${emergencynumber}`)}
        >
          {emergencynumber}
        </Text>
      ),
    },
    { label: "Father's Name", value: fathername },
    { label: "Mother's Name", value: mothername },
    { label: "Mobile Number", value: mobile },
    { label: "Email Id", value: email },
  ];

  return (
    <>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

      <SafeAreaView style={styles.safe}>
        
        {/* Header */}
        <View style={styles.headerAtten}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitleAtten}>Kid Profile</Text>

          <View style={{ width: '15%' }} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          
          {/* Profile Image */}
          <View style={styles.avatarContainer}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require('../../../assets/images/khushbuverma.jpg')
              }
              style={styles.avatar}
            />

            <Text style={styles.name}>{name}</Text>

            <Text style={styles.classSection}>
              Class {studentclass}-{section}
            </Text>
          </View>

          {/* Info Box */}
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

          {/* Logout Button  */}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      {/* 🔥 Logout Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Logout</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalButtonsContainer}>
              
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.grayBG }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff4e76' }]}
                onPress={handleLogout}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Logout
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// function InfoRow({ label, value, isLastRow }) {
//   return (
//     <View
//       style={[
//         styles.row,
//         isLastRow && { borderBottomWidth: 0, paddingBottom: 0 }
//       ]}
//     >
//       <Text style={styles.rowLabel}>{label}</Text>
//       <Text style={styles.rowValue}>{value}</Text>
//     </View>
//   );
// }


function InfoRow({ label, value, isLastRow }) {
  // 🟢 Handle both plain text and React components
  const renderValue =
    value === null ||
    value === undefined ||
    value === "" ||
    value === "null" ||
    value === "undefined"
      ? "NA"
      : value;

  return (
    <View
      style={[
        styles.row,
        isLastRow && { borderBottomWidth: 0, paddingBottom: 0 }
      ]}
    >
      <Text style={styles.rowLabel}>{label}</Text>

      {/* If value is a component (like phone link), we render it directly */}
      {typeof renderValue === "string" ? (
        <Text style={styles.rowValue}>{renderValue}</Text>
      ) : (
        renderValue
      )}
    </View>
  );
}



// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingBottom: 60,
  },
  headerAtten: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 0.5,
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
    borderBottomWidth: 0.5,
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
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 15,
    fontFamily: 'InterTight-Medium',
    color: COLORS.textDark,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },
});

