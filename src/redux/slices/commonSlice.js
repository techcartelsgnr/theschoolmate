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

// 🔥 MAIN COMMON SLICE
const commonSlice = createSlice({
  name: "common",

  initialState: {
    loading: false,
    schoolInfo: null,
    error: null,
  },

  reducers: {
    clearSchoolInfo: (state) => {
      state.schoolInfo = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
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
  },
});

export const { clearSchoolInfo } = commonSlice.actions;

export default commonSlice.reducer;
