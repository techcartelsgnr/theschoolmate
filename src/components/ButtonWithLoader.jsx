import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ButtonWithLoader = ({
  isLoading,
  text,
  onPress,
  bgColor = '#007bff',
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.btn, { backgroundColor: bgColor }]}
    disabled={isLoading}
  >
    {isLoading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={styles.text}>{text}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default ButtonWithLoader;
