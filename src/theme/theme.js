import { RFValue } from "react-native-responsive-fontsize";

export const COLORS = {
  primaryGradientStart: '#FF6B6B',
  primaryGradientEnd: '#FFB86B',
  secondaryGradientStart: '#6B7AFF',
  secondaryGradientEnd: '#8E6BFF',
  background: '#1A1A2E',
  cardBackground: '#2E2E4F',
  whiteBackground: '#fefefe',
  grayBackground: '#8A9A5B',
  grayBG: '#cccccc',

  // --- Font Colors ---
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textDark: '#1A1A2E',
  textAccent: '#6B7AFF',
  accent: '#00D1FF',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
};


export const FontSizes = {
  tiny: RFValue(8),      // very small
  xsmall: RFValue(10),
  small: RFValue(12),
  normal: RFValue(14),
  medium: RFValue(16),
  large: RFValue(18),
  xlarge: RFValue(20),
  xl: RFValue(24),
  xxl: RFValue(28),
  title: RFValue(32),    // big headings
};