import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  users: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.users = null;
      localStorage.removeItem('token');
    }
  }
});

export const { setToken, setUsers, logout } = authSlice.actions;

export default authSlice.reducer;
