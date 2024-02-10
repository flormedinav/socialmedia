import Post from "../models/postModel.js";

async function getMyTotalPosts(userId) {
  const userPosts = await Post.find({ user: userId });
  return userPosts.length;
}

export default getMyTotalPosts;
