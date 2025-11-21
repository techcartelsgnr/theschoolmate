import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import InputAuthField from '../../components/InputAuthField';
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
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* App Logo */}

        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* School ID */}
        <Text style={styles.label}>School ID</Text>
        <InputAuthField
          label="XXXXXX"
          firstLabelText="TSM"
          keyboardType="number-pad"
          value={schoolId}
          onChangeText={setSchoolId}
        />

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.loginRow}>
          <InputAuthField
            label="9876543210"
            keyboardType="number-pad"
            firstLabelText="+91"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        {/* Enter PIN */}
        <Text style={styles.label}>Enter PIN</Text>
        <InputAuthField
          label="XXXX"
          firstLabelText="PIN"
          keyboardType="number-pad"
          value={pin}
          onChangeText={setPin}
          maxLength={4}
          fieldButtonLabel={'Forgot PIN ?'}
          fieldButtonFunction={() => {
            navigation.navigate();
          }}
          isSecure
        />

        <View style={{ width: '100%' }}>
          <ButtonWithLoader
            text="Login"
            isLoading={loading}
            onPress={handleLogin}
          />
        </View>
      </ScrollView>
    </>
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
    marginVertical: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: COLORS.black,
    fontFamily: 'InterTight-Medium',
    marginTop: 10,
    marginBottom: 5,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
