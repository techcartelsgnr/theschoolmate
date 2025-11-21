import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Spacing } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SubjectCard = ({ icon, subject, grade }) => (
  <View style={styles.subjectCard}>
    <View style={styles.subjectRow}>
      <Icon name={icon} size={24} color="#4287f5" style={{ marginRight: 10 }} />
      <Text style={styles.subjectText}>{subject}</Text>
    </View>
    <View style={styles.gradeRow}>
      <Text style={styles.gradeLabel}>Average Grade</Text>
      <View style={styles.gradeBadge}>
        <Text style={styles.gradeText}>{grade}</Text>
      </View>
    </View>
  </View>
);

export default function MarksScreen() {
  const navigation = useNavigation();
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

          <Text style={styles.headerTitleAtten}>Marks</Text>

          <View style={{ width: '15%' }} />
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabActiveText}>Term 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Term 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>2024-25</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Overall Summary</Text>
          <Text style={styles.summaryPercent}>88%</Text>
          <Text style={styles.summaryGrade}>Grade A</Text>
        </View>
        <ScrollView style={styles.body}>
          <Text style={styles.sectionTitle}>Subject Performance</Text>
          <SubjectCard icon="calculate" subject="Mathematics" grade="A+" />
          <SubjectCard icon="science" subject="Science" grade="A-" />
          <SubjectCard icon="science" subject="Science" grade="A+" />
          <SubjectCard icon="history-edu" subject="History" grade="B+" />
          <SubjectCard icon="computer" subject="Computer Science" grade="A-" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f6fa' },
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#182951',
  },
  tabText: {
    color: '#182951',
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
  },
  tabActiveText: {
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: '#baf5d9',
    margin: 20,
    borderRadius: 12,
    padding: 18,
    alignItems: 'flex-start',
  },
  summaryTitle: {
    color: '#2f4858',
    fontSize: 17,
    fontFamily: 'InterTight-Bold',
    marginBottom: 7,
  },
  summaryPercent: {
    fontSize: 34,
    color: '#2f4858',
    fontFamily: 'InterTight-Bold',
  },
  summaryGrade: {
    fontSize: 18,
    color: '#388e3c',
    fontFamily: 'Quicksand-Bold',
  },
  body: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: '#2f4858',
    marginBottom: 10,
  },
  subjectCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  subjectRow: { flexDirection: 'row', alignItems: 'center' },
  subjectText: { fontSize: 12, color: '#2f4858', fontFamily: 'Quicksand-Bold' },
  gradeRow: { flexDirection: 'row', alignItems: 'center' },
  gradeLabel: {
    fontSize: 11,
    color: '#999',
    marginRight: 7,
    fontFamily: 'Quicksand-Bold',
  },
  gradeBadge: {
    backgroundColor: '#0bc501ff',
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  gradeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Quicksand-Bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 5,
  },
});
