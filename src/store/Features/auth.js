import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    email: null,
    userName: 'User',
    created: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.token = action.payload._id;
      state.created = action.payload.created;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = 'User';
      state.token = null;
      state.created = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
