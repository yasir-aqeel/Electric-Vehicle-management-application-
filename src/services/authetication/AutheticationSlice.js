import { createSlice } from "@reduxjs/toolkit";
import { authetication, getUserProfile, login, newPassword, resetPassword } from "../../constants/authetication";
import { clearStoredToken, enableDemoMode, isDemoMode, setStoredToken } from "../../utils/tokenStorage";

export const demoUser = {
  id: "demo-user",
  first_name: "Demo",
  last_name: "User",
  email: "demo@voltgrid.local",
  role: "operator",
};


const initialState = {
  user: isDemoMode() ? demoUser : {},
  isDemo: isDemoMode(),
  resetPassword:{},
  newPassword:{}
};

const authenticationSlice = createSlice({
  name:authetication,
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = {};
      state.isDemo = false;
      clearStoredToken();
    },
    logInDemo: (state) => {
      state.user = demoUser;
      state.isDemo = true;
      enableDemoMode();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(`${authetication}/${login}/fulfilled`, (state, action) => {
        const { data, status } = action.payload || {};
        if (status >= 200 && status < 300) {
          state.user = data?.data;
          state.isDemo = false;
          setStoredToken(data?.data?.token);
        } else if (status >= 400 && status < 500) {
          // toast.error(data?.message);
        }
      })
      .addCase(`${authetication}/${resetPassword}/fulfilled`, (state, action) => {
        const { data, status } = action.payload || {};
        if (status >= 200 && status < 300) {
          state.resetPassword = data?.data;
        } else if (status >= 400 && status < 500) {
          // toast.error(data?.message);
        }
      })
      .addCase(`${authetication}/${newPassword}/fulfilled`, (state, action) => {
        const { data, status } = action.payload || {};
        if (status >= 200 && status < 300) {
          state.newPassword = data?.data;
        } else if (status >= 400 && status < 500) {
          // toast.error(data?.message);
        }
      })
      .addCase(`${authetication}/${getUserProfile}/fulfilled`, (state, action) => {
        const { data, status } = action.payload || {};
        if (status >= 200 && status < 300) {
          state.user = data?.data;
        } else if (status >= 400 && status < 500) {
          // toast.error(data?.message);
        }
      })
   
  },
});

export const { logOut, logInDemo } = authenticationSlice.actions;
export default authenticationSlice.reducer;
