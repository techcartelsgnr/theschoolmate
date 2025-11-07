import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../theme/theme';

const InputField = ({
  label,
  icon,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  onBlur,
  isSecure,
  maxLength,
  editable = true,
  value,
  flex,
  flexBasis,
  width = '100%',
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f1f5f9',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 12,
    }}
  >
    {icon}
    <TextInput
      placeholder={label}
      placeholderTextColor={COLORS.placeholder}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
      onChangeText={onChangeText}
      onBlur={onBlur}
      maxLength={maxLength}
      editable={editable}
      value={value}
      style={{
        flex: flex || 1,
        flexBasis,
        width,
        color: COLORS.black,
        fontFamily: 'Mulish-Bold',
        paddingVertical: 0,
      }}
    />
    {fieldButtonFunction && (
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: COLORS.black, fontFamily: 'Mulish-Bold' }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default InputField;
