import instance from "../../config";
import { SERVICES_MESSAGES } from "../../constants/servicesMessages";
import { TYPE_TOAST, callToast } from "../../utils/toast";

export const createPost = async ({ userId, token, sendBody }) => {
  try {
    const response = await instance.post(
      `/posts/${userId}/new-post`,
      sendBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    callToast(TYPE_TOAST.SUCCESS, response.data.message);

    return response.data;
  } catch (error) {
    console.error("Error in createPost: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.POSTS.ERROR.CREATE_POST
    );
  }
};

export const getFeedPosts = async ({ userId, token }) => {
  try {
    const response = await instance.get(`/posts/${userId}/feed-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getFeedPosts: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.POSTS.ERROR.GET_FEED_POSTS
    );
  }
};

export const getUserPosts = async ({ userId, token }) => {
  try {
    const response = await instance.get(`/posts/${userId}/user-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getUserPosts: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.POSTS.ERROR.GET_USER_POSTS
    );
  }
};

export const likePost = async ({ userId, token, postId }) => {
  try {
    const response = await instance.patch(
      `/posts/${userId}/${postId}/like`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in likePost: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.POSTS.ERROR.LIKE_POST
    );
  }
};

export const addComment = async ({ userId, token, postId, sendBody }) => {
  try {
    const response = await instance.post(
      `/posts/${userId}/${postId}/add-comment`,
      sendBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in addComment: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.POSTS.ERROR.ADD_COMMENT
    );
  }
};
