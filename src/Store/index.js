import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  auth: false,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.auth = true;
      state.email = action.payload;
    },
    logout(state) {
      state = initialState;
    },
  },
});
export const store = configureStore({ reducer: authSlice.reducer });
export const authActions = authSlice.actions;
