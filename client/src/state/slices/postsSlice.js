import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });

      state.posts = updatedPosts;
    },
  },
});

export const { setPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
