import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phone: '',
  generatedOtp: '',
  enteredOtp: '',
  loggedIn: false,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setGeneratedOtp: (state, action) => {
      state.generatedOtp = action.payload;
    },
    setEnteredOtp: (state, action) => {
      state.enteredOtp = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    // Modified reset: does NOT reset loggedIn
    reset: (state) => {
      state.phone = '';
      state.generatedOtp = '';
      state.enteredOtp = '';
    },
  },
});

export const {
  setPhone,
  setGeneratedOtp,
  setEnteredOtp,
  setLoggedIn,
  reset,
} = otpSlice.actions;

export default otpSlice.reducer;
