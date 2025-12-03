import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../theme/theme';

const InputAuthField = ({
  label,
  icon,
  keyboardType,
  firstLabelText,
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
      //   backgroundColor: '#f1f5f9',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 12,
    }}
  >
    {icon}
    {
      <Text
        style={{
          color: COLORS.black,
          fontFamily: 'InterTight-Bold',
          fontSize: 22,
          marginRight: 5,
        }}
      >
        {firstLabelText}
      </Text>
    }
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
        fontSize: 22,
        fontFamily: 'InterTight-Bold',
        paddingVertical: 0,
        opacity: 0.5,
      
      }}
    />
    {fieldButtonFunction && (
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: COLORS.primary, fontFamily: 'InterTight-Bold' }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default InputAuthField;
