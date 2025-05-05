import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
        state.profile = null; 
      },
  },
});

export const { setProfileData,clearProfile } = profileSlice.actions;
export default profileSlice.reducer; // ✅ default export
