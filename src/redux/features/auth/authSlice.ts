import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  stage: 'idle', // 'register' | 'otp' | 'authenticated'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.stage = 'register';
    },
  },
});

export const { setUser, setStage, logout } = authSlice.actions;
export default authSlice.reducer;
