import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FontSizes } from "../../theme/theme";
import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";

export default function FeedbackHistoryScreen({ navigation }) {
  const { token } = useSelector((state) => state.auth);

  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const res = await commanServices.getFeedbackHistory(token);
    setHistory(res.feedbackHistory || []);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await commanServices.getFeedbackHistory(token);
    setHistory(res.feedbackHistory || []);
    setRefreshing(false);
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Feedback History</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* ---------- BODY TABLE ---------- */}
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {history.length === 0 && !loading ? (
            <Text style={styles.noDataText}>No Feedback Found</Text>
          ) : (
            history.map((item, index) => (
              <View key={index} style={styles.tableRow}>

                {/* ---------- HEADER ROW: 3 COLUMNS ---------- */}
                <View style={styles.topRow}>
                  <Text style={[styles.tableHeadText, styles.col]}>SL No</Text>
                  <Text style={[styles.tableHeadText, styles.col]}>Date</Text>
                  <Text style={[styles.tableHeadText, styles.col]}>Problem</Text>
                </View>

                {/* ---------- VALUE ROW: 3 COLUMNS ---------- */}
                <View style={styles.valueRow}>
                  <Text style={[styles.rowText, styles.col]}>#{index + 1}</Text>
                  <Text style={[styles.rowText, styles.col]}>{item.date}</Text>
                  <Text style={[styles.rowText, styles.col]}>{item.problem_type}</Text>
                </View>

                {/* ---------- DESCRIPTION SECTION ---------- */}
                <View style={styles.descRow}>
                  <Text style={styles.tableHeadText}>Description</Text>
                  <Text style={styles.rowDescText}>{item.description}</Text>
                </View>

              </View>
            ))
          )}
        </ScrollView>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  backButton: { padding: 4 },

  headerTitle: {
    fontSize: FontSizes.medium,
    fontFamily: "Quicksand-Bold",
    color: COLORS.textDark,
  },

  // ---------- EACH ROW CONTAINER ----------
  tableRow: {
    marginHorizontal: 15,
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  topRow: {
    flexDirection: "row",
    
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 6,
  },

  valueRow: {
    flexDirection: "row",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
  },

  col: {
    flex: 1,
  },

  // ---------- DESCRIPTION BLOCK ----------
  descRow: {
    marginTop: 6,
  },

  tableHeadText: {
    fontSize: FontSizes.small,
    fontFamily: "Quicksand-Bold",
    color: COLORS.textAccent,
  },

  rowText: {
    fontSize: 13,
    fontFamily: "InterTight-Medium",
    color: COLORS.textDark,
  },

  rowDescText: {
    fontSize: 13,
    fontFamily: "InterTight-Medium",
    color: COLORS.textDark,
    marginTop: 4,
    flexWrap: "wrap",
  },

  noDataText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 15,
    color: COLORS.gray,
    fontFamily: "InterTight-Medium",
  },
});
