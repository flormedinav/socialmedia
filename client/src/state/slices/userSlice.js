import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setClearUser: (state) => {
      state.user = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("User friends non-existent");
      }
    },
    setTotalLikes: (state, action) => {
      state.user.totalLikes = action.payload;
    },
    setTotalPosts: (state, action) => {
      state.user.totalPosts = action.payload;
    },
  },
});

export const {
  setUser,
  setFriends,
  setClearUser,
  setTotalLikes,
  setTotalPosts,
} = userSlice.actions;

export default userSlice.reducer;
