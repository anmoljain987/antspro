import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  email: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state) {
      state.isAuth = false;
      state.email = "";
      state.id = "";
    },
  },
});
export const store = configureStore({ reducer: authSlice.reducer });
export const authActions = authSlice.actions;
