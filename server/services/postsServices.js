import {
  GLOBAL_ERROR_MESSAGES,
  QUERY_SELECT_INFO_USER,
} from "../constants/globals.js";
import {
  POST_ERROR_MESSAGES,
  POST_SUCCESS_MESSAGES,
} from "../constants/postsConstants.js";
import getMyTotalLikes from "../helpers/getMyTotalLikes.js";
import getMyTotalPosts from "../helpers/getMyTotalPosts.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

class PostsServices {
  constructor() {}

  async getAllPosts() {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: QUERY_SELECT_INFO_USER,
      })
      .populate({
        path: "comments.user",
        select: QUERY_SELECT_INFO_USER,
      });

    return {
      message: POST_SUCCESS_MESSAGES.ALL_POSTS_RETRIEVED,
      data: posts,
    };
  }

  async getFeedPosts({ userId }) {
    try {
      const user = await User.findById(userId);

      if (!user) throw new Error(GLOBAL_ERROR_MESSAGES.USER_NOT_FOUND);

      const friendIds = user.friends;

      friendIds.push(userId);

      const posts = await Post.find({ user: { $in: friendIds } })
        .sort({
          createdAt: -1,
        })
        .populate({
          path: "user",
          select: QUERY_SELECT_INFO_USER,
        })
        .populate({
          path: "comments.user",
          select: QUERY_SELECT_INFO_USER,
        });

      return {
        message: POST_SUCCESS_MESSAGES.FEED_POSTS_RETRIEVED,
        data: posts,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async getUserPosts({ userId }) {
    try {
      const user = await User.findById(userId);

      if (!user) throw new Error(GLOBAL_ERROR_MESSAGES.USER_NOT_FOUND);

      const userPosts = await Post.find({ user: userId })
        .sort({
          createdAt: -1,
        })
        .populate({
          path: "user",
          select: QUERY_SELECT_INFO_USER,
        })
        .populate({
          path: "comments.user",
          select: QUERY_SELECT_INFO_USER,
        });

      return {
        message: POST_SUCCESS_MESSAGES.USER_POSTS_RETRIEVED,
        data: userPosts,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async createPost({ userId, description, picture }) {
    try {
      const user = await User.findById(userId).select(QUERY_SELECT_INFO_USER);

      if (!user) throw new Error(GLOBAL_ERROR_MESSAGES.USER_NOT_FOUND);

      const newPost = new Post({
        user: user._id,
        description,
        picture,
        likes: {},
        comments: [],
      });

      await newPost.save();

      const { data } = await this.getFeedPosts({ userId });

      const totalPosts = await getMyTotalPosts(userId);

      return {
        message: POST_SUCCESS_MESSAGES.POST_CREATED,
        data: {
          data,
          totalPosts,
        },
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async editPost({ userId, postId, description, picture }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(GLOBAL_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      post.description = description;
      post.picture = picture;
      await post.save();

      const { data } = await this.getFeedPosts({ userId });

      return {
        message: POST_SUCCESS_MESSAGES.POST_UPDATED,
        data,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async deletePost({ userId, postId }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(GLOBAL_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      if (post.user.toString() !== userId) {
        throw new Error(GLOBAL_ERROR_MESSAGES.UNAUTHORIZED);
      }

      await post.remove();

      const { data } = await this.getFeedPosts({ userId });
      const totalPosts = await getMyTotalPosts(userId);

      return {
        message: POST_SUCCESS_MESSAGES.POST_DELETED,
        data: {
          data,
          totalPosts,
        },
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async likePost({ postId, userId }) {
    const post = await Post.findById(postId);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    )
      .populate({
        path: "user",
        select: QUERY_SELECT_INFO_USER,
      })
      .populate({
        path: "comments.user",
        select: QUERY_SELECT_INFO_USER,
      });

    const totalLikes = await getMyTotalLikes(userId);

    return {
      message: POST_SUCCESS_MESSAGES.POSTS_LIKES_UPDATED,
      data: {
        data: updatedPost,
        totalLikes,
      },
    };
  }

  async getComments({ postId }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(POST_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      const comments = post.comments;

      return {
        message: POST_SUCCESS_MESSAGES.COMMENTS_RETRIEVED,
        data: comments,
      };
    } catch (error) {
      throw new Error(error.message || error);
    }
  }

  async addComment({ userId, postId, text }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(POST_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      const newComment = {
        user: userId,
        text,
      };

      post.comments.push(newComment);
      await post.save();

      const postUpdated = await Post.findById(postId)
        .populate({
          path: "user",
          select: QUERY_SELECT_INFO_USER,
        })
        .populate({
          path: "comments.user",
          select: QUERY_SELECT_INFO_USER,
        });

      return {
        message: POST_SUCCESS_MESSAGES.COMMENT_ADDED,
        data: postUpdated,
      };
    } catch (error) {
      throw new Error(error.message || error);
    }
  }

  async editComment({ postId, commentId, text }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(POST_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        throw new Error(POST_ERROR_MESSAGES.COMMENT_NOT_FOUND);
      }

      if (!comment.isEdited) {
        comment.isEdited = true;
      }

      comment.text = text;
      await post.save();

      const postUpdated = await Post.findById(postId)
        .populate({
          path: "user",
          select: QUERY_SELECT_INFO_USER,
        })
        .populate({
          path: "comments.user",
          select: QUERY_SELECT_INFO_USER,
        });

      return {
        message: POST_SUCCESS_MESSAGES.COMMENT_EDITED,
        data: postUpdated,
      };
    } catch (error) {
      throw new Error(error.message || error);
    }
  }

  async deleteComment({ postId, commentId }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(POST_ERROR_MESSAGES.POST_NOT_FOUND);
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        throw new Error(POST_ERROR_MESSAGES.COMMENT_NOT_FOUND);
      }

      comment.remove();
      await post.save();

      const postUpdated = await Post.findById(postId)
        .populate({
          path: "user",
          select: QUERY_SELECT_INFO_USER,
        })
        .populate({
          path: "comments.user",
          select: QUERY_SELECT_INFO_USER,
        });

      return {
        message: POST_SUCCESS_MESSAGES.COMMENT_DELETED,
        data: postUpdated,
      };
    } catch (error) {
      throw new Error(error.message || error);
    }
  }
}

export default PostsServices;
