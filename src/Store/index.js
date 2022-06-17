import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    signup(state) {
      state.isAuth = true;
    },
  },
});
export const store = configureStore({ reducer: authSlice.reducer });
export const authActions = authSlice.actions;
