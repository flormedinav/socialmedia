import instance from "../../config";
import { SERVICES_MESSAGES } from "../../constants/servicesMessages";
import { TYPE_TOAST, callToast } from "../../utils/toast";

export const getUser = async ({ userId, token }) => {
  try {
    const response = await instance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getUser: ", error);

    if (error.response && error.response.status === 401) {
      throw error;
    }

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.USER.ERROR.GET_USER
    );
  }
};

export const addRemoveFriend = async ({ userId, friendId, token }) => {
  try {
    const response = await instance.put(
      `/users/${userId}/friends/${friendId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in addRemoveFriend: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error ||
        SERVICES_MESSAGES.USER.ERROR.ADD_REMOVE_FRIEND
    );
  }
};

export const getUserFriends = async ({ userId, token }) => {
  try {
    const response = await instance.get(`/users/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getUserFriends: ", error);

    if (error.response && error.response.status === 401) {
      throw error;
    }

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.USER.ERROR.GET_USER_FRIEND
    );
  }
};

export const getAllUsers = async ({ userId, token }) => {
  try {
    const response = await instance.get(`/users/${userId}/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getAllUsers: ", error);

    if (error.response && error.response.status === 401) {
      throw error;
    }

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.USER.ERROR.GET_USER_FRIEND
    );
  }
};
