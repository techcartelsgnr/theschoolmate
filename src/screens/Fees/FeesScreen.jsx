import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Spacing } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

export default function FeesScreen({ navigation }) {
  const feeData = [
    { id: 1, title: 'Tuition Fee', amount: '₹2,500', date: '01 Nov 2025' },
    { id: 2, title: 'Library Fee', amount: '₹1,200', date: '20 Oct 2025' },
    { id: 3, title: 'Transport Fee', amount: '₹1,000', date: '10 Oct 2025' },
  ];

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fees</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ---------- Main Content ---------- */}
        <ScrollView contentContainerStyle={styles.container}>
          {/* Outstanding Fees Box */}
          <View style={styles.feeBox}>
            <Text style={styles.feeBoxTitle}>Outstanding Fees</Text>
            <Text style={styles.feePrice}>₹ 15,000</Text>
            <Text style={styles.feeDueDate}>Dues - 20/December/2025</Text>
          </View>

          <View></View>

          {/* Fee History Section */}

          <View style={styles.feeHistoryBox}>
            {feeData.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.feeRow,
                  index === feeData.length - 1 && { borderBottomWidth: 0 }, // hide border for last row
                ]}
              >
                <Image
                  source={require('../../../assets/images/rupee-symbol.png')}
                  style={styles.icon}
                />

                <View style={styles.feeDetails}>
                  <Text style={styles.feeRowTitle}>{item.title}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Paid</Text>
                  </View>
                </View>

                <View style={styles.amountBox}>
                  <Text style={styles.amountText}>{item.amount}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        {/* ---------- Bottom Pay Bar ---------- */}
<View style={styles.payBar}>
  <View>
    <Text style={styles.totalDueText}>Total Due</Text>
    <Text style={styles.totalDueAmount}>₹ 15,000</Text>
  </View>

  <TouchableOpacity style={styles.payButton}>
    <Text style={styles.payButtonText}>Pay Now</Text>
  </TouchableOpacity>
</View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteBackground,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  feeBox: {
    backgroundColor: COLORS.primary || '#3b82f6',
    padding: 20,
    borderRadius: 10,
  },
  feeBoxTitle: {
    fontSize: Spacing.medium,
    fontFamily: 'Quicksand-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  feePrice: {
    fontSize: Spacing.xl,
    fontFamily: 'InterTight-Bold',
    color: '#fff',
  },
  feeDueDate: {
    fontSize: Spacing.medium,
    fontFamily: 'Quicksand-Medium',
    color: '#fff',
    marginTop: 5,
  },
  feeHistoryBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  feeDetails: {
    flex: 1,
  },
  feeRowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: '#28a745',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  payBar: {
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

totalDueText: {
  fontSize: 13,
  color: '#555',
  fontFamily: 'Quicksand-Medium',
},

totalDueAmount: {
  fontSize: 20,
  fontFamily: 'InterTight-Bold',
  color: COLORS.primary || '#3b82f6',
},

payButton: {
  backgroundColor: COLORS.primary || '#3b82f6',
  paddingVertical: 10,
  paddingHorizontal: 22,
  borderRadius: 8,
},

payButtonText: {
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Quicksand-Bold',
},

});
