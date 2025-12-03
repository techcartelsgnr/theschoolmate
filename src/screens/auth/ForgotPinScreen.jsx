import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import InputAuthField from '../../components/InputAuthField';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { COLORS } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPinScreen() {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      return alert('Please enter valid phone number');
    }

    setLoading(true);

    // Simulate API / real OTP call
    setTimeout(() => {
      setLoading(false);

      // Navigate to OTP Screen
      navigation.navigate('OtpScreen', {
        mobile: phone, // pass phone number to OTP screen
      });
    }, 1000);
  };

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />

      <ScrollView contentContainerStyle={styles.container}>
         <Image
                  source={require('../../../assets/images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
        <Text style={styles.title}>Forgot PIN</Text>

        <InputAuthField
          label="9876543210"
          keyboardType="number-pad"
          firstLabelText="+91"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />

        <View style={{ width: '100%', marginTop: 20 }}>
          <ButtonWithLoader
            text="Send OTP"
            isLoading={loading}
            onPress={handleSendOtp}
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
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'InterTight-Bold',
    color: COLORS.black,
    marginBottom: 15,
    marginTop: 0,
  },
 
});
