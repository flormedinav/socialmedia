import { createSlice } from "@reduxjs/toolkit";
import { TYPE_THEMES } from "../../constants/global";

const initialState = {
  mode: TYPE_THEMES.LIGHT,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode =
        state.mode === TYPE_THEMES.LIGHT ? TYPE_THEMES.DARK : TYPE_THEMES.LIGHT;
    },
  },
});

export const { setMode } = generalSlice.actions;

export default generalSlice.reducer;
