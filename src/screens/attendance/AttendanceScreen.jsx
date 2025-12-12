import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FontSizes } from "../../theme/theme";
import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";
import { useNavigation } from "@react-navigation/native";

export default function AttendanceScreen() {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);

  const [summary, setSummary] = useState(null);
  const [groupedData, setGroupedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // --------------------------------
  // 📌 Load Attendance Data
  // --------------------------------
  const loadAttendance = async () => {
    const res = await commanServices.getAttendanceSummary(token);

    if (res.attendanceSummary) {
      const s = res.attendanceSummary;
      setSummary(s);

      // 🔥 Group data month-wise
      let monthArray = s.calendar.map((monthObj) => {
        return {
          month: monthObj.month, // "December 2025"
          items: monthObj.days.map((d) => ({
            date: formatDate(d.date),
            present: d.status === "Present",
          })),
        };
      });

      // 🔥 Sort months newest → oldest by year_month
      monthArray.sort((a, b) => {
        const aDate = new Date(a.month);
        const bDate = new Date(b.month);
        return bDate - aDate; // latest first
      });

      setGroupedData(monthArray);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAttendance();
    setRefreshing(false);
  };

  // --------------------------------
  // 📌 Detailed Row UI
  // --------------------------------
  const DetailedRow = ({ item }) => (
    <View style={styles.detailRow}>
      <View style={{ width: 18, marginRight: 5 }}>
        {/* <Icon
          name={item.present ? "check-circle" : "cancel"}
          color={item.present ? "#48c775" : "#ff7272"}
          size={24}
        /> */}
        <Ionicons name="calendar" size={14} color={COLORS.textDark} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.detailDate}>{item.date}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.detailStatus,
            { color: item.present ? "#48c775" : "#ff7272" },
          ]}
        >
          {item.present ? "Present" : "Absent"}
        </Text>
      </View>
    </View>
  );

  // --------------------------------
  // 📌 Month Block Renderer
  // --------------------------------
  const renderMonthBlock = ({ item }) => (
    <View style={{ marginBottom: 0 }}>
      {/* Month Name Title */}
      <Text style={styles.sectionTitle}>{item.month}</Text>

      {/* Rows */}
      {item.items.map((row, index) => (
        <DetailedRow key={index} item={row} />
      ))}
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.headerAtten}>
          <TouchableOpacity
            style={styles.backButtonAtten}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitleAtten}>Attendance</Text>

          <View style={{ width: "15%" }} />
        </View>

        {/* LIST */}
        <FlatList
          data={groupedData}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderMonthBlock}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4287f5"]}
            />
          }
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
          ListHeaderComponent={
            summary && (
              <>
                {/* SUMMARY CARD */}
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryLabel}>Monthly Summary</Text>

                  <Text style={styles.summaryValue}>
                    {summary.attendance_percentage}%
                  </Text>

                  <Text
                    style={[
                      styles.summaryStatus,
                      {
                        color:
                          summary.attendance_percentage >= 75
                            ? "#48c775"
                            : "#ff7272",
                      },
                    ]}
                  >
                    {summary.attendance_percentage >= 75
                      ? "Good Attendance"
                      : "Low Attendance"}
                  </Text>

                  <Text style={styles.summaryFootnote}>
                    Total: {summary.total_present}/{summary.total_days} days
                  </Text>
                </View>

                {/* Remove old "Detailed List" title */}
              </>
            )
          }
        />
      </SafeAreaView>
    </>
  );
}

// ------------------------------------------------------
// 🎨 Existing Styles (only added sectionTitle for month)
// ------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f6fa" },

  headerAtten: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 1,
  },

  backButtonAtten: { padding: 4 },

  headerTitleAtten: {
    fontSize: FontSizes.small,
    fontFamily: "Quicksand-Bold",
    color: COLORS.textDark,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 18,
    marginBottom: 5,
    elevation: 1,
  },

  summaryLabel: {
    fontWeight: "bold",
    fontSize: FontSizes.small,
    color: "#182951"
  },
  summaryValue: {
    fontSize: FontSizes.title,
    fontWeight: "bold",
    color: "#48c775",
    marginTop: 6,
  },
  summaryStatus: {
    fontWeight: "bold",
    fontSize: 17
  },
  summaryFootnote: {
    color: "#888",
    marginTop: 2,
    fontSize: FontSizes.xsmall,
  },

  sectionTitle: {
    fontFamily: "Quicksand-Bold",
    fontSize: FontSizes.normal,
    color: "#182951",
    marginVertical: 10,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 5,
    padding: 12,
    elevation: 1,
  },

  detailDate: {
    fontSize: FontSizes.xsmall,
    color: "#182951",
    fontFamily: "Quicksand-Bold",
  },

  detailStatus: {
    fontSize: FontSizes.xsmall,
    fontFamily: "Quicksand-Bold",
  },
});
