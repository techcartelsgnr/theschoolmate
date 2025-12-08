import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commanServices from "../services/commanServices";

// 🔥 ASYNC ACTION (API CALL)
export const fetchSchoolInfo = createAsyncThunk(
  "common/fetchSchoolInfo",
  async (token, { rejectWithValue }) => {
    try {
      const res = await commanServices.getSchoolInfo(token);
      return res.schoolInfo; // returned from API
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// ===============================
// ⭐ Get Marks Summary
// ===============================
export const getMarksSummaryData = createAsyncThunk(
  "common/getMarksSummaryData",
  async ({ token, exam_id }, { rejectWithValue }) => {
    try {
      const { marksSummary } = await commanServices.getMarksSummary(token, exam_id);
      return marksSummary;
    } catch (error) {
      console.log("Marks Summary Error:", error);
      return rejectWithValue("Unable to load marks summary");
    }
  }
);


// ===============================
// ⭐ fetch notification
// ===============================

export const fetchNotifications = createAsyncThunk(
  "common/fetchNotifications",
  async (token, { rejectWithValue }) => {
    try {
      const { count, notifications } = await commanServices.getNotifications(token);
      return { count, notifications };
    } catch (err) {
      return rejectWithValue("Unable to load notifications");
    }
  }
);


// 🔥 MAIN COMMON SLICE
const commonSlice = createSlice({
  name: "common",

  initialState: {
    loading: false,
    schoolInfo: null,
    error: null,
    // getMarksSummaryData
    marksSummary: {
      exams: [],
      exam: null,
      overall: null,
      subjects: [],
    },
    marksLoading: false,
    marksError: null,
    // notification badge
    notifications: [],
    notificationsLoading: false,
    unreadCount: 0,   // from API "count"

  },
  reducers: {
    clearSchoolInfo: (state) => {
      state.schoolInfo = null;
      state.error = null;
      state.loading = false;
    },
    // getMarksSummaryData
    clearMarks(state) {
      state.marksSummary = {
        exams: [],
        exam: null,
        overall: null,
        subjects: [],
      };
      state.marksError = null;
      state.marksLoading = false;
    },
    // Notification reducers
    clearUnreadCount(state) {
      state.unreadCount = 0;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },

  extraReducers: (builder) => {

    /* ------------------ SCHOOL INFO ------------------ */
    builder
      .addCase(fetchSchoolInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSchoolInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolInfo = action.payload;
      })

      .addCase(fetchSchoolInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch school info";
      });

    /* ------------------ MARKS SUMMARY ------------------ */
    builder
      .addCase(getMarksSummaryData.pending, state => {
        state.marksLoading = true;
        state.marksError = null;
      })
      .addCase(getMarksSummaryData.fulfilled, (state, action) => {
        state.marksLoading = false;
        state.marksSummary = {
          exams: action.payload?.exams || [],
          exam: action.payload?.exam || null,
          overall: action.payload?.overall || null,
          subjects: action.payload?.subjects || [],
        };
      })
      .addCase(getMarksSummaryData.rejected, (state, action) => {
        state.marksLoading = false;
        state.marksError = action.payload || "Failed to fetch marks summary";
      });


      /* ------------------ Fetch Notifications ------------------ */
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.notifications;

        // ⭐ unread badge count from API
        state.unreadCount = action.payload.count;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.notificationsLoading = false;
      });

  },
});

export const { clearSchoolInfo, clearUnreadCount, clearNotifications } = commonSlice.actions;

export default commonSlice.reducer;
