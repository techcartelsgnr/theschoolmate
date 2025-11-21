import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, Spacing } from '../../theme/theme';

const daysInMonth = [
  '',
  '',
  '',
  '',
  '',
  '',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  '',
  '',
  '',
];

const attendanceStatus = {
  present: [
    1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 30,
  ],
  absent: [6, 10, 13, 19, 25, 26],
  late: [28],
};

const getDayStatus = day => {
  if (attendanceStatus.present.includes(day)) return 'present';
  if (attendanceStatus.absent.includes(day)) return 'absent';
  if (attendanceStatus.late.includes(day)) return 'late';
  return '';
};

const weekDays = ['S0', 'M', 'T1', 'W', 'T2', 'F', 'S3'];
const weekLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const AttendanceCalendar = () => (
  <View style={styles.calendarContainer}>
    <View style={styles.calendarHeader}>
      <Text style={styles.calendarHeaderText}>December 2024</Text>
      <View style={styles.calendarTodayCircle}>
        <Text style={styles.calendarTodayText}>20</Text>
      </View>
    </View>

    <View style={styles.calendarDaysRow}>
      {weekLabels.map((d, idx) => (
        <Text style={styles.calendarDayName} key={idx}>
          {d}
        </Text>
      ))}
    </View>

    <View style={styles.calendarGrid}>
      {daysInMonth.map((date, idx) => {
        let status = getDayStatus(date);
        let bgColor = '#fff';
        if (status === 'present') bgColor = '#6fd780';
        if (status === 'absent') bgColor = '#ff7272';
        if (status === 'late') bgColor = '#ffd950';

        return (
          <View
            key={idx}
            style={[styles.calendarCell, { backgroundColor: bgColor }]}
          >
            <Text style={styles.calendarCellText}>{date || ''}</Text>
          </View>
        );
      })}
    </View>
  </View>
);

const details = [
  {
    date: 'Dec 19, 2024',
    in: '8:00 AM',
    out: '2:30 PM',
    present: true,
    sub: 'Thuesday',
  },
];

const DetailedRow = ({ item }) => (
  <View style={styles.detailRow}>
    <View style={{ width: 24, marginRight: 5 }}>
      <Icon
        name={item.present ? 'check-circle' : 'cancel'}
        color={item.present ? '#48c775' : '#ff7272'}
        size={24}
      />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.detailDate}>{item.date}</Text>
      <Text style={styles.detailSub}>{item.sub}</Text>
    </View>

    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.detailInOut}>
        In: <Text style={{ color: '#182951' }}>{item.in}</Text>
      </Text>
      <Text style={styles.detailInOut}>
        Out: <Text style={{ color: '#182951' }}>{item.out}</Text>
      </Text>
    </View>
  </View>
);

export default function AttendanceScreen({ navigation }) {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.whiteBackground}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerAtten}>
          <TouchableOpacity
            style={styles.backButtonAtten}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitleAtten}>Attendance</Text>

          <View style={{ width: '15%' }} />
        </View>

        {/* MAIN LIST */}
        <FlatList
          data={details}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={DetailedRow}
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
          ListHeaderComponent={
            <>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Monthly Summary</Text>
                <Text style={styles.summaryValue}>92%</Text>

                <Text style={[styles.summaryStatus, { color: '#48c775' }]}>
                  Present
                </Text>

                <Text style={styles.summaryFootnote}>Total: 18/20 days</Text>
              </View>

              <AttendanceCalendar />

              <Text style={styles.sectionTitle}>Detailed List</Text>
            </>
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  headerAtten: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 1,
  },

  backButtonAtten: { padding: 4 },

  headerTitleAtten: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },

  summaryLabel: { fontWeight: 'bold', fontSize: 15, color: '#182951' },
  summaryValue: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#48c775',
    marginTop: 6,
  },
  summaryStatus: { fontWeight: 'bold', fontSize: 17 },
  summaryFootnote: { color: '#888', marginTop: 2, fontSize: 13 },

  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  calendarHeaderText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    color: '#182951',
  },

  calendarTodayCircle: {
    backgroundColor: '#4287f5',
    borderRadius: 12,
    padding: 7,
  },

  calendarTodayText: {
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    fontSize: Spacing.medium,
  },

  calendarDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  calendarDayName: {
    width: 27,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarCell: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    borderRadius: 14,
  },

  calendarCellText: {
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    color: '#182951',
  },

  sectionTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    color: '#182951',
    marginVertical: 10,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },

  detailDate: { fontSize: 16, color: '#182951', fontFamily: 'Quicksand-Bold' },
  detailSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Quicksand-Bold',
  },
  detailInOut: { fontSize: 13, color: '#888', fontFamily: 'Quicksand-Bold' },
});
