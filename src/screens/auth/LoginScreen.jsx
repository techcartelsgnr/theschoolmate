import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { COLORS } from '../../theme/theme';

export default function LoginScreen() {
  const [schoolId, setSchoolId] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!schoolId || !phone || !pin) return alert('Please fill all fields');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Login Success for ${schoolId}`);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      {/* <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}

      {/* School ID */}
      {/* School ID */}
      <Text style={styles.label}>School ID</Text>
      <InputField
        label="Enter School ID"
        value={schoolId}
        onChangeText={setSchoolId}
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <InputField
        label="Enter Phone Number"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={10}
      />

      {/* Enter PIN */}
      <Text style={styles.label}>Enter PIN</Text>
      <InputField
        label="Enter 4 Digit PIN"
        keyboardType="number-pad"
        value={pin}
        onChangeText={setPin}
        maxLength={4}
        isSecure
      />

      {/* Login Button */}
      <ButtonWithLoader
        text="Login"
        isLoading={loading}
        onPress={handleLogin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: COLORS.black,
    fontFamily: 'Mulish-Bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
