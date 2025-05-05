import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import { loadState,saveState } from "./localStorageUtils";
import  profileReducer  from "../redux/features/profileSlice";


const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
  preloadedState: persistedState, // Load from localStorage
});

// Save to localStorage on any state change
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    profile: store.getState().profile,
  });
});
