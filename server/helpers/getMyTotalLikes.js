import Post from "../models/postModel.js";

async function getMyTotalLikes(userId) {
  let totalMyLikes = 0;

  const allPosts = await Post.find();

  for (const post of allPosts) {
    if (post.likes.get(userId)) {
      totalMyLikes += 1;
    }
  }

  return totalMyLikes;
}

export default getMyTotalLikes;
