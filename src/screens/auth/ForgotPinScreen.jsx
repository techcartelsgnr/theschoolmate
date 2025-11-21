import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Spacing, FontSizes } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonWithLoader from '../../components/ButtonWithLoader';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const PIN_LENGTH = 4;

export default function ForgotPinScreen({ navigation }) {
  const [pin, setPin] = useState(new Array(PIN_LENGTH).fill(''));
  const [confirmPin, setConfirmPin] = useState(new Array(PIN_LENGTH).fill(''));
  const [currentInputType, setCurrentInputType] = useState('pin');
  const pinInputs = useRef([]);
  const confirmPinInputs = useRef([]);

  const onNavigateBack = () => {
    navigation.goBack();
  };

  const getTargetInputs = () =>
    currentInputType === 'pin' ? pinInputs.current : confirmPinInputs.current;

  const getTargetPinState = () =>
    currentInputType === 'pin' ? pin : confirmPin;

  const setTargetPinState = newPinState => {
    if (currentInputType === 'pin') setPin(newPinState);
    else setConfirmPin(newPinState);
  };

  const handleChangePin = (value, index) => {
    const newPin = [...getTargetPinState()];
    newPin[index] = value;
    setTargetPinState(newPin);

    if (value && index < PIN_LENGTH - 1) {
      getTargetInputs()[index + 1].focus();
    } else if (
      value &&
      index === PIN_LENGTH - 1 &&
      currentInputType === 'pin'
    ) {
      setCurrentInputType('confirmPin');
      confirmPinInputs.current[0].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const currentPinState = getTargetPinState();
      if (!currentPinState[index] && index > 0) {
        getTargetInputs()[index - 1].focus();
      }
    }
  };

  const handleSetPin = () => {
    const newPin = pin.join('');
    const newConfirmPin = confirmPin.join('');

    if (newPin.length !== PIN_LENGTH || newConfirmPin.length !== PIN_LENGTH) {
      Alert.alert(
        'Incomplete PIN',
        `Please enter a ${PIN_LENGTH}-digit PIN and confirm it.`,
      );
      return;
    }

    if (newPin !== newConfirmPin) {
      Alert.alert('PIN Mismatch', 'Your PINs do not match. Please try again.');
      setPin(new Array(PIN_LENGTH).fill(''));
      setConfirmPin(new Array(PIN_LENGTH).fill(''));
      setCurrentInputType('pin');
      pinInputs.current[0].focus();
      return;
    }

    Alert.alert('PIN Set', `Your new PIN is ${newPin}`);
    console.log('Setting new PIN:', newPin);
  };

  return (
    <>
      {/* ✅ StatusBar with theme background color */}
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateBack}
            >
              <Ionicons name="return-up-back" style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.content}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Create Your PIN</Text>
              <Text style={styles.description}>
                Set a {PIN_LENGTH}-digit PIN for quick and secure access.
              </Text>

              {/* Enter New PIN */}
              <View style={styles.pinInputGroup}>
                <Text style={styles.inputLabel}>Enter New PIN</Text>
                <View style={styles.pinInputContainer}>
                  {pin.map((digit, index) => (
                    <TextInput
                      key={`pin-${index}`}
                      ref={ref => (pinInputs.current[index] = ref)}
                      style={[
                        styles.pinInput,
                        currentInputType === 'pin' && styles.activePinInput,
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={value => handleChangePin(value, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      secureTextEntry
                      onFocus={() => setCurrentInputType('pin')}
                    />
                  ))}
                </View>
              </View>

              {/* Confirm New PIN */}
              <View style={styles.pinInputGroup}>
                <Text style={styles.inputLabel}>Confirm New PIN</Text>
                <View style={styles.pinInputContainer}>
                  {confirmPin.map((digit, index) => (
                    <TextInput
                      key={`confirm-${index}`}
                      ref={ref => (confirmPinInputs.current[index] = ref)}
                      style={[
                        styles.pinInput,
                        currentInputType === 'confirmPin' &&
                          styles.activePinInput,
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={value => handleChangePin(value, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      secureTextEntry
                      onFocus={() => setCurrentInputType('confirmPin')}
                    />
                  ))}
                </View>
              </View>

              <View style={{ marginHorizontal: 0, flexDirection: 'row' }}>
                <ButtonWithLoader text="Set Pin" onPress={handleSetPin} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteBackground,
    height: height * 1,
  },
  safeArea: { flex: 1, backgroundColor: COLORS.whiteBackground },
  keyboardAvoidingView: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: Spacing.medium,
    zIndex: 10,
    padding: Spacing.small,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingTop: 60,
  },
  title: {
    fontSize: FontSizes.xl * 1.5,
    color: COLORS.textDark,
    marginBottom: Spacing.medium,
    textAlign: 'center',
    fontFamily: 'InterTight-Bold',
  },
  description: {
    fontSize: FontSizes.medium,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: Spacing.xl * 1.5,
    fontFamily: 'Quicksand-Medium',
  },
  pinInputGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    color: COLORS.textDark,
    fontFamily: 'Quicksand-Bold',
    fontSize: FontSizes.medium,
    marginBottom: Spacing.medium,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  pinInput: {
    width: (width * 0.8 - (PIN_LENGTH - 1) * Spacing.xl) / PIN_LENGTH,
    aspectRatio: 1,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: FontSizes.xl,
    color: COLORS.textDark,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  activePinInput: {
    borderColor: COLORS.cardBackground,
    borderWidth: 2,
  },
  setPinButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: Spacing.xl,
  },
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
    height: 55,
    backgroundColor: COLORS.accent,
    borderRadius: 15,
  },
  setPinButtonText: {
    color: COLORS.textPrimary,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.textDark,
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginVertical: 0,
  },
});
