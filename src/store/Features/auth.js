import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    email: null,
    userName: 'User',
    id: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.id = action.payload._id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = 'User';
      state.created = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectId = (state) => state.auth.id;

export default authSlice.reducer;
