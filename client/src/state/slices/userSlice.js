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
  },
});

export const { setUser, setFriends, setClearUser } = userSlice.actions;

export default userSlice.reducer;
