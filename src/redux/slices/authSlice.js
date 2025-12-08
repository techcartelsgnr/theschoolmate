import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commanServices from '../services/commanServices';
import authService from '../services/authServices';

const initialState = {
  isInitial: false,
  pending: false,
  error: false,
  name: '',
  image: '',
  mobile: '',
  uid: '',
  token: null,
  user_id: '',
  email: '',
  studentclass: '',
  fathername: '',
  mothername: '',
  section: '',
  dob: '',
  bloodgroup: '',
  rollnumber: '',
  emergencynumber: '',
  isLoading: false,
  messasge: null,
  refCode: '',
  isOtp: false,
  isLogout: false,
  firstTime: true,
  helpline_number: '',
  fcmToken: null,
};

export const chkLogin = createAsyncThunk('auth/chkLogin', async thunkAPI => {
  try {
    const user = await AsyncStorage.getItem('user_info');
    const first = await AsyncStorage.getItem('firstTime');
    console.log('authslice at 30', user);
    const tmp_user = { user: user, firstTime: first };
    return tmp_user;
  } catch (e) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async ({ uid, date_of_birth,fcmToken }, thunkAPI) => {
    try {
      console.log('i am here at 46 in slice', uid, date_of_birth,fcmToken);
      const res = await authService.login({ uid, date_of_birth,fcmToken });
      return res;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Register here
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, mobile, password, refCode, otp, fcmToken }, thunkAPI) => {
    try {
      return await authService.register({
        name,
        email,
        mobile,
        password,
        refCode,
        otp,
        fcmToken,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get OTP here
export const getotp = createAsyncThunk(
  'auth/getotp',
  async ({ email, mobile, password }, thunkAPI) => {
    try {
      return await authService.getotp({
        email,
        mobile,
        password,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
// Resend OTP here
export const ResendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ mobile }, thunkAPI) => {
    try {
      return await authService.ResendOtp({
        mobile,
      });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// logout slice

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ token }, thunkAPI) => {
    console.log('Logout Token=>' + token);
    try {
      return await authService.logout({ token });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ token, old_pin, new_pin }, thunkAPI) => {
    try {
      return await authService.changePassword({ token, old_pin, new_pin });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ mobile, otp, password }, thunkAPI) => {
    try {
      return await authService.resetPassword({ mobile, otp, password });
    } catch (e) {
      console.log('in catch', e);
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const updateProfilePic = createAsyncThunk(
  'auth/updateProfilePic',
  async ({ token, formData }, thunkAPI) => {
    try {
      return await authService.updateProfilePic({ token, formData });
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// suggetion
export const suggestions = createAsyncThunk(
  'auth/suggestions',
  async ({ token, service_type, suggestion }, thunkAPI) => {
    try {
      return await authService.suggestions({ token, service_type, suggestion });
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// suggetion

// states manage here

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
     // ⭐ NEW: SET FCM TOKEN
    setFcmToken: (state, action) => {
      console.log("🔥 Saved FCM token to Redux:", action.payload);
      state.fcmToken = action.payload;
    },
  },
  extraReducers: builder => {
    ////////////////////////////===========Login==========/////////////////////////////
    builder.addCase(fetchLogin.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // console.log(action.payload.user.paid);
      console.log('AUTH SLICE LINE 220', action.payload.access_token);
      if (action.payload.errors === undefined) {
        authService.commanTask(state, action);
        // authService.createChannel();
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    ///////////////////////////////////////////////////////////
    builder.addCase(chkLogin.pending, (state, action) => {
      state.pending = true;
      state.isLoading = true;
      state.isInitial = true;
      // console.log(`Token Loaded Successfully=>${action.payload}`);
    });
    builder.addCase(chkLogin.fulfilled, (state, action) => {
      console.log('line 243 authslice', action.payload.user);
      const user = JSON.parse(action.payload.user);
      console.log('user', user);
      if (user != null) {
        state.token = user.student.token;
        state.image = user.student.image;
        state.email = user.student.email;
        state.name = user.student.name;
        state.mobile = user.student.mobile;
        state.user_id = user.student.uid;
        state.studentclass = user.student.class;
        state.fathername = user.student.father_name;
        state.mothername = user.student.mother_name;
        state.section = user.student.section;
        state.dob = user.student.dob;
        state.bloodgroup = user.student.blood_group;
        state.rollnumber = user.student.roll_no;
        state.emergencynumber = user.student.emergency_number;
      }
      state.firstTime = JSON.parse(action.payload.firstTime);
      state.isLoading = false;
      state.pending = false;
      state.isInitial = false;
      // console.log(`Token Loaded Successfully=>${action.payload}`);
    });
    builder.addCase(chkLogin.rejected, (state, action) => {
      // state.token = action.payload.token;
      state.isInitial = false;

      console.log('Failed to Load token');
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Register 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(register.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        authService.commanTask(state, action);
        // authService.createChannel();
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 GET OTP 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(getotp.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(getotp.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        state.isOtp = true;
        console.log('is OTP true part' + state.isOtp);
        commanServices.showToast(action.payload.message);
      } else {
        state.isOtp = false;
        console.log('is OTP else part' + state.isOtp);
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(getotp.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Resend OTP 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(ResendOtp.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(ResendOtp.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        state.isOtp = true;
        // console.log('is OTP true part' + state.isOtp);
        commanServices.showToast(action.payload.message);
      } else {
        state.isOtp = false;
        console.log('is OTP else part' + state.isOtp);
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(ResendOtp.rejected, (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.error = true;
      state.token = null;
    });

    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Logout 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(logout.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);

      state.token = null;
      state.image = '';
      state.email = '';
      state.name = '';
      state.mobile = '';
      state.user_id = '';
      state.studentclass = '';
      state.fathername = '';
      state.mothername = '';
      state.section = '';
      state.dob = '';
      state.bloodgroup = '';
      state.rollnumber = '';
      state.emergencynumber = '';

      state.pending = false;
      state.error = false;
      state.isLogout = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Change Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(changePassword.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Reset Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(resetPassword.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        commanServices.showToast(action.payload.message);
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
      state.error = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Change Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////

    builder.addCase(updateProfilePic.pending, (state, action) => {
      // console.log('Pending State');
      commanServices.showToast("Please Wait we'll get back to you.");
      state.pending = true;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      commanServices.showToast(action.payload.message);
      console.log('action.payload.profile', action.payload.profile);
      if (action.payload.errors === undefined) {
        state.image = action.payload.profile;
      }
      state.pending = false;
      state.error = false;
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Suggestion 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(suggestions.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(suggestions.fulfilled, (state, action) => {
      //console.log(action.payload.message);
      commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(suggestions.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    //  add all states here
  },
});
export const { setFcmToken } = authSlice.actions;  // ⭐ EXPORT REDUCER
export default authSlice.reducer;