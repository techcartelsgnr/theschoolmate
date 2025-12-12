import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSizes } from '../../theme/theme';
import { Dropdown } from 'react-native-element-dropdown';
import commanServices from "../../redux/services/commanServices";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';


export default function FeedbackScreen() {
    
  const { token } = useSelector((state) => state.auth);

const navigation = useNavigation();
  const [problemType, setProblemType] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);

  // Dropdown data
  const problemList = [
    { label: "Homework Not Updated", value: "homework" },
    { label: "Fee Issue", value: "fee" },
    { label: "Teacher Behaviour", value: "teacher" },
    { label: "Transport Issue", value: "transport" },
    { label: "App Login Issue", value: "login" },
    { label: "Wrong Attendance", value: "attendance" },
    { label: "Wrong Marks", value: "marks" },
    { label: "ID Card Issue", value: "id" },
    { label: "Other Issue", value: "other" },
  ];

  // ---------------- SUBMIT FEEDBACK ----------------
  const handleSubmit = async () => {
    if (!problemType || !feedbackText.trim()) {
      alert("Please select a problem and type your feedback.");
      return;
    }

    setLoading(true);

    const res = await commanServices.submitFeedback(token, {
      problem_type: problemType,
      feedback_text: feedbackText,
    });

    setLoading(false);

    if (res.success) {
      alert("Feedback submitted successfully!");

      // Reset fields
      setProblemType(null);
      setFeedbackText("");

      // Optionally navigate to history:
      // navigation.push("FeedbackHistoryScreen");
    } else {
      alert("Something went wrong. Try again.");
    }
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

          <Text style={styles.headerTitle}>Feedback</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* ---------- Main Content ---------- */}
        <ScrollView contentContainerStyle={styles.container}>

          {/* Dropdown */}
          <Text style={styles.labelText}>Select Issue Type</Text>
          <Dropdown
            style={styles.dropdown}
            data={problemList}
            labelField="label"
            valueField="value"
            placeholder="Choose Issue"
            value={problemType}
            onChange={(item) => setProblemType(item.value)}
            placeholderStyle={{ color: "#888" }}
            selectedTextStyle={{ color: COLORS.textDark }}
            itemTextStyle={{ color: COLORS.textDark }}
          />

          {/* Textarea */}
          <Text style={[styles.labelText, { marginTop: 15 }]}>Describe Your Issue</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={6}
            placeholder="Write your feedback..."
            placeholderTextColor="#888"
            value={feedbackText}
            onChangeText={setFeedbackText}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </Text>
          </TouchableOpacity>

        </ScrollView>

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

  labelText: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },

  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  textArea: {
    height: 140,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: FontSizes.small,
    fontFamily: 'Quicksand-Medium',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },

  submitBtn: {
    backgroundColor: COLORS.primary || "#3b82f6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },

  submitBtnText: {
    color: '#fff',
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
  },
});
