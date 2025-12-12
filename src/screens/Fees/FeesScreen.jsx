import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSizes } from '../../theme/theme';

import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";

const { width, height } = Dimensions.get('window');

export default function FeesScreen({ navigation }) {

  const { token } = useSelector((state) => state.auth);

  const [outstanding, setOutstanding] = useState(null);
  const [paidHistory, setPaidHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // -------------------------------
  // 🚀 Fetch Fee Summary API
  // -------------------------------
  const loadFeeSummary = async () => {
    const res = await commanServices.getFeeSummary(token);

    if (res.feeSummary) {
      setOutstanding(res.feeSummary.outstanding);
      setPaidHistory(res.feeSummary.paid_history);
    }
  };

  // -------------------------------
  // 🔥 Auto load data on page open
  // -------------------------------
  useEffect(() => {
    loadFeeSummary();
  }, []);

  // -------------------------------
  // 🔄 Pull-to-refresh
  // -------------------------------
  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeeSummary();
    setRefreshing(false);
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

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

        {/* ---------- Content with RefreshControl ---------- */}
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4287f5"]}
            />
          }
        >

          {/* Outstanding Fees Box */}
          <View style={styles.feeBox}>
            <Text style={styles.feeBoxTitle}>Outstanding Fees</Text>

            <Text style={styles.feePrice}>
              ₹ {outstanding?.total_due ?? 0}
            </Text>

            <Text style={styles.feeDueDate}>
              Total Fee: ₹ {outstanding?.total_fee ?? 0}
            </Text>

            <Text style={styles.feeDueDate}>
              Total Paid: ₹ {outstanding?.total_paid ?? 0}
            </Text>

            {outstanding?.is_completed && (
              <Text style={[styles.feeDueDate, { color: "#fff" }]}>
                All Fees Cleared ✔
              </Text>
            )}
          </View>

          {/* ---------- Paid History Section ---------- */}
          <View style={styles.feeHistoryBox}>
            {paidHistory.length === 0 && (
              <Text style={{ textAlign: "center", padding: 20, color: "#666" }}>
                No payment history found.
              </Text>
            )}

            {paidHistory.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.feeRow,
                  index === paidHistory.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Image
                  source={require('../../../assets/images/rupee-symbol.png')}
                  style={styles.icon}
                />

                <View style={styles.feeDetails}>
                  <Text style={styles.feeRowTitle}>{item.fee_head}</Text>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.amountBox}>
                  <Text style={styles.amountText}>₹ {item.amount}</Text>
                  <Text style={styles.dateText}>{item.paid_date}</Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>

      </SafeAreaView>
    </>
  );
}

// --------------------------
// 🎨 Styles
// --------------------------
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

  backButton: { padding: 4 },

  headerTitle: {
    fontSize: FontSizes.medium,
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
    fontSize: FontSizes.small,
    fontFamily: 'Quicksand-Bold',
    color: '#fff',
    marginBottom: 8,
  },

  feePrice: {
    fontSize: FontSizes.title,
    fontFamily: 'InterTight-Bold',
    color: '#fff',
  },

  feeDueDate: {
    fontSize: FontSizes.small,
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
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: "contain",
  },

  feeDetails: { flex: 1 },

  feeRowTitle: {
    fontSize: FontSizes.normal,
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
    fontSize: FontSizes.xsmall,
    fontWeight: '500',
  },

  amountBox: {
    alignItems: 'flex-end',
  },

  amountText: {
    fontSize: FontSizes.normal,
    fontWeight: '600',
    color: '#000',
  },

  dateText: {
    fontSize: FontSizes.xsmall,
    color: '#888',
    marginTop: 2,
  },
});
