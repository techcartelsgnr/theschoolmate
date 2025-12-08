import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../theme/theme';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { getMarksSummaryData } from '../../redux/slices/commonSlice';

const SubjectCard = ({ subject, grade }) => (
  <View style={styles.subjectCard}>
    <View style={styles.subjectRow}>
      <Icon name="book" size={24} color="#4287f5" style={{ marginRight: 10 }} />
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
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const { marksSummary, marksLoading } = useSelector(state => state.common);

  const examsList = [...(marksSummary?.exams || [])].sort((a, b) => b.id - a.id);
  const subjects = marksSummary?.subjects || [];

  const examPercentage = marksSummary?.exam?.percentage || 0;
  const examGrade = marksSummary?.exam?.grade || '--';

  // ⭐ FIX: Active exam state (initially null)
  const [activeExam, setActiveExam] = useState(null);

  // Load marks on first screen opening
  useEffect(() => {
    if (token) {
      dispatch(getMarksSummaryData({ token, exam_id: null }));
    }
  }, [token]);

  // ⭐ FIX: Set default active exam only once, not on every API update
  useEffect(() => {
    if (!activeExam && marksSummary?.exam?.name) {
      setActiveExam(marksSummary.exam.name);
    }
  }, [marksSummary]);

  // When switching exams
  const handleExamChange = (exam) => {
    setActiveExam(exam.name);

    dispatch(
      getMarksSummaryData({
        token,
        exam_id: exam.id,
      })
    );
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <View style={styles.headerAtten}>
          <TouchableOpacity style={styles.backButtonAtten} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.headerTitleAtten}>Marks</Text>
          <View style={{ width: '15%' }} />
        </View>

        {/* ⭐ EXAM TABS (NOW WORK PERFECTLY) */}
        <View style={styles.tabs}>
          {examsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeExam === item.name && styles.tabActive,
              ]}
              onPress={() => handleExamChange(item)}
            >
              <Text
                style={
                  activeExam === item.name ? styles.tabActiveText : styles.tabText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Overall Summary</Text>

          {marksLoading ? (
            <ActivityIndicator size="small" color="#182951" />
          ) : (
            <>
              <Text style={styles.summaryPercent}>{examPercentage}%</Text>
              <Text style={styles.summaryGrade}>Grade {examGrade}</Text>
            </>
          )}
        </View>

        {/* SUBJECT LIST */}
        <ScrollView style={styles.body}>
          <Text style={styles.sectionTitle}>Subject Performance</Text>

          {marksLoading ? (
            <ActivityIndicator size="small" color="#182951" style={{ marginTop: 20 }} />
          ) : subjects.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
              No subjects found.
            </Text>
          ) : (
            subjects.map((item, index) => (
              <SubjectCard
                key={index}
                subject={item.subject_name}
                grade={item.grade}
              />
            ))
          )}
        </ScrollView>

      </SafeAreaView>
    </>
  );
}


/* --------------------------------------------------
   STYLES
-------------------------------------------------- */
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
    borderRadius: 10,
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
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
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

  subjectText: {
    fontSize: 12,
    color: '#2f4858',
    fontFamily: 'Quicksand-Bold',
  },

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
  },
});
