import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/slices/authSlice";

import InputAuthField from '../../components/InputAuthField';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { COLORS } from '../../theme/theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [uid, setUid] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  // -------------------------
  // FORMAT DOB - DD/MM/YYYY
  // -------------------------
  const formatDOB = (value) => {
    let cleaned = value.replace(/[^0-9]/g, '');

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    } else if (cleaned.length > 4) {
      cleaned = cleaned.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    }

    if (cleaned.length <= 10) setDob(cleaned);
  };

  // Convert to DD-MM-YYYY for API
  const convertDOB = (dob) => dob.replace(/\//g, "-");

  // -------------------------
  // HANDLE LOGIN
  // -------------------------
  
  const handleLogin = () => {
    if (!uid || !dob) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.CENTER);
      return;
    }

    if (dob.length !== 10) {
      ToastAndroid.show("Enter valid DOB (DD/MM/YYYY)", ToastAndroid.CENTER);
      return;
    }

    const finalDOB = convertDOB(dob);

    setLoading(true);

    dispatch(fetchLogin({ uid: uid, date_of_birth: finalDOB }))
      .unwrap()
      .then(() => {
        // Login success
      })
      .catch((error) => {
        console.log("Login Error:", error);

        ToastAndroid.showWithGravity(
          "Invalid Student ID or DOB",
          ToastAndroid.CENTER,
          ToastAndroid.CENTER
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <StatusBar backgroundColor={'#1E3A8A'} barStyle="light-content" />

      <View style={styles.container}>
        {/* TOP SECTION */}
        <View style={styles.topSection}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Welcome to SchoolMate</Text>
          <Text style={styles.appSubtitle}>Login to continue</Text>
        </View>

        {/* BOTTOM SECTION */}
        <View style={styles.bottomSection}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.label}>Student ID</Text>
            <InputAuthField
              label="STD-XXXXX"
              firstLabelText="UID"
              keyboardType="default"
              value={uid}
              onChangeText={setUid}
            />

            <Text style={styles.label}>Enter DOB</Text>
            <InputAuthField
              label="DD/MM/YYYY"
              firstLabelText="DOB"
              keyboardType="number-pad"
              value={dob}
              onChangeText={formatDOB}
              maxLength={10}
            />

            <View style={{ width: '100%', marginTop: 25 }}>
              <ButtonWithLoader
                text="Login"
                isLoading={loading}
                onPress={handleLogin}
              />
            </View>

          </ScrollView>
        </View>
      </View>
    </>
  );
}


// ================================
// STYLES
// ================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },

  topSection: {
    height: '32%',
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },

  logo: {
    width: 130,
    height: 130,
  },

  appTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    marginTop: 10,
  },

  appSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    fontFamily: 'Quicksand-Medium',
    marginTop: 4,
  },

  bottomSection: {
    height: '68%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingVertical: 25,
    elevation: 6,
  },

  label: {
    alignSelf: 'flex-start',
    color: COLORS.black,
    fontFamily: 'InterTight-Medium',
    marginTop: 12,
    marginBottom: 6,
  },
});
