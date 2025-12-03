import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'https://theschoolmate.in/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

const login = async ({ uid, date_of_birth }) => {
  console.log('auth slice line number 14', uid, date_of_birth);
  const response = await authAxios.post(`/student/login`, {
    uid: uid,
    date_of_birth: date_of_birth,
    // uid: "1234",
    // date_of_birth: "25-11-2001",
  });
  // Save login response
  console.log('response at line number 21', response.data);
  if (!response.data.error) {
    await AsyncStorage.setItem("user_info", JSON.stringify(response.data));
  }
  console.log('i am at line 24 on services');

  return response.data;
};

const register = async ({ name, email, mobile, password, refCode, otp, fcmToken }) => {
  const response = await authAxios.post(`/register`, {
    name: name,
    email: email,
    mobile: mobile,
    pin: password,
    referred_by: refCode,
    otp: otp,
    fcm_token: fcmToken
  });
  if (response.data.errors === undefined) {
    console.log('i m in register');
    subScribeTounpaid();
    await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
    await AsyncStorage.setItem('firstTime', JSON.stringify(false));
  }
  return response.data;
};

//GET OTP
const getotp = async ({ email, mobile, password }) => {
  const response = await authAxios.post(`/getotp`, {
    email: email,
    mobile: mobile,
    pin: password,
  });
  return response.data;
};
//GET OTP
const ResendOtp = async ({ mobile }) => {
  const response = await authAxios.post(`/resendotp`, {
    mobile: mobile,
  });
  return response.data;
};

// Logout
const logout = async ({ token }) => {
  const response = await authAxios.post(
    `/student/logout`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  AsyncStorage.removeItem('user_info').then(() => {
    console.log('Logut Successfully');
  });

  return response.data;
};
// changePassword
const changePassword = async ({ token, new_pin, old_pin }) => {
  console.log(new_pin);
  const response = await authAxios.post(
    `/change_password`,
    { old_pin: old_pin, new_pin: new_pin },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );

  return response.data;
};
const resetPassword = async ({ mobile, otp, password }) => {
  const response = await authAxios.post(`/userresetpassword`, {
    mobile,
    password,
    otp,
  });

  // ✅ Check for backend error manually
  if (response.data.errors) {
    throw new Error(response.data.errors); // forces catch in thunk
  }

  return response.data;
};
const updateProfilePic = async ({ token, formData }) => {
  const response = await axios({
    method: 'post',
    url: 'https://theschoolmate.in/api/user_image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  console.log('response in auth slice========>', response.data.user);

  const strUserInfo = await AsyncStorage.getItem("userInfo");
  const parsUserInfo = JSON.parse(strUserInfo)

  parsUserInfo.user = response.data.user;
  // // parsUserInfo.user.image = response.data.profile

  await AsyncStorage.setItem('userInfo', JSON.stringify(parsUserInfo));

  console.log('user info in update profile===>', response.data);
  return response.data;
};

// suggestions
const suggestions = async ({ token, service_type, suggestion }) => {
  const response = await authAxios.post(
    `/suggestions`,
    { service_type: service_type, suggestion: suggestion },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log(response.data);
  return response.data;
};

const commanTask = (state, action) => {
  if (action.payload.student) {
    state.token = action.payload.student.token;
    state.image = action.payload.student.image;
    state.email = action.payload.student.email;
    state.name = action.payload.student.name;
    state.mobile = action.payload.student.mobile;
    state.user_id = action.payload.student.uid;
    state.studentclass = action.payload.student.class;
    state.fathername = action.payload.student.father_name;
    state.mothername = action.payload.student.mother_name;
    state.section = action.payload.student.section;
    state.dob = action.payload.student.dob;
    state.bloodgroup = action.payload.student.blood_group;
    state.rollnumber = action.payload.student.roll_no;
    state.emergencynumber = action.payload.student.emergency_number;

    state.pending = false;
    state.error = false;
  }
};

const authService = {
  commanTask,
  register,
  getotp,
  login,
  logout,
  changePassword,
  updateProfilePic,
  ResendOtp,
  resetPassword,
  suggestions,
};

export default authService;