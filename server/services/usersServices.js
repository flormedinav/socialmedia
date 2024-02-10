import {
  NOT_SELECT_PASSWORD,
  QUERY_SELECT_INFO_USER,
} from "../constants/globals.js";
import {
  STATUS_FRIEND_REQUEST,
  STATUS_PRIVACY,
  USER_ERROR_MESSAGES,
  USER_SUCCESS_MESSAGES,
} from "../constants/usersConstants.js";
import { formattedFriendsFunction } from "../helpers/formattedFriends.js";
import getMyTotalLikes from "../helpers/getMyTotalLikes.js";
import getMyTotalPosts from "../helpers/getMyTotalPosts.js";
import FriendRequest from "../models/friendRequestModel.js";
import User from "../models/userModel.js";

class UsersServices {
  constructor() {}

  async getUser(id) {
    try {
      const user = await User.findById(id)
        .select(NOT_SELECT_PASSWORD)
        .populate("friends");

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const totalPosts = await getMyTotalPosts(id);
      const totalLikes = await getMyTotalLikes(id);

      return {
        message: USER_SUCCESS_MESSAGES.USER_FOUND,
        data: {
          ...user.toObject(),
          totalLikes,
          totalPosts,
        },
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async getUserFriends(id) {
    try {
      const user = await User.findById(id);

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const friends = await Promise.all(
        user.friends.map((friendId) =>
          User.findById(friendId).select(QUERY_SELECT_INFO_USER)
        )
      );

      return {
        message: USER_SUCCESS_MESSAGES.FRIENDS_FOUND,
        data: friends,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find().select(NOT_SELECT_PASSWORD);

      return {
        response: USER_SUCCESS_MESSAGES.ALL_USERS,
        data: users,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async removeFriend({ id, friendId }) {
    try {
      const user = await User.findById(id);

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const friend = await User.findById(friendId);

      if (!friend) throw new Error(USER_ERROR_MESSAGES.FRIEND_NOT_FOUND);

      if (!user.friends.includes(friendId))
        throw new Error(USER_ERROR_MESSAGES.NOT_FRIENDS);

      user.friends = user.friends.filter((id) => id.toString() !== friendId);
      friend.friends = friend.friends.filter((id) => id.toString() !== id);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );

      const formattedFriends = formattedFriendsFunction(friends);

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_REMOVED,
        data: formattedFriends,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async addRemoveFriend({ userId, friendId }) {
    try {
      const user = await User.findById(userId);

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const friend = await User.findById(friendId);

      if (!friend) throw new Error(USER_ERROR_MESSAGES.FRIEND_NOT_FOUND);

      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id.toString() !== friendId);
        friend.friends = friend.friends.filter(
          (id) => id.toString() !== userId
        );
      } else {
        user.friends.push(friendId);
        friend.friends.push(userId);
      }

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );

      const formattedFriends = formattedFriendsFunction(friends);

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_UPDATED,
        data: formattedFriends,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async getFriendRequestsReceived(id) {
    try {
      const user = await User.findById(id);

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const friendRequestsInfo = await Promise.all(
        user.friendRequestsReceived.map(async (request) => {
          const requestInfo = await FriendRequest.findById(request);

          const senderInfo = await User.findById(requestInfo.sender).select(
            NOT_SELECT_PASSWORD
          );

          return {
            requestId: requestInfo._id,
            senderInfo,
            status: requestInfo.status,
          };
        })
      );

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_REQUEST_RECEIVED,
        data: friendRequestsInfo,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async getFriendRequestsSent(id) {
    try {
      const user = await User.findById(id);

      if (!user) throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);

      const friendRequestsInfo = await Promise.all(
        user.friendRequestsSent.map(async (request) => {
          const requestInfo = await FriendRequest.findById(request);

          const recieverInfo = await User.findById(
            requestInfo?.receiver
          ).select(NOT_SELECT_PASSWORD);

          return {
            requestId: requestInfo?._id,
            recieverInfo,
            status: requestInfo?.status,
          };
        })
      );

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_REQUEST_SENT,
        data: friendRequestsInfo,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async sendFriendRequest({ id, friendId }) {
    try {
      if (id === friendId)
        throw new Error(USER_ERROR_MESSAGES.FRIEND_REQUEST_SELF);

      const areFriends = await User.exists({
        _id: id,
        friends: friendId,
      });

      if (areFriends) {
        throw new Error(USER_ERROR_MESSAGES.ALREADY_FRIEND);
      }

      const existingReceivedRequest = await FriendRequest.findOne({
        sender: id,
        receiver: friendId,
        status: STATUS_FRIEND_REQUEST.PENDING,
      });

      const existingSentRequest = await FriendRequest.findOne({
        sender: friendId,
        receiver: id,
        status: STATUS_FRIEND_REQUEST.PENDING,
      });
      existingReceivedRequest, existingSentRequest;
      if (existingReceivedRequest || existingSentRequest) {
        throw new Error(USER_ERROR_MESSAGES.FRIEND_REQUEST_EXISTS);
      }

      //Creamos nueva solicitud
      const newRequest = await FriendRequest.create({
        sender: id,
        receiver: friendId,
      });

      //Añadimos la solicitud en el array de solicitudes recibidas
      await User.findByIdAndUpdate(friendId, {
        $push: { friendRequestsReceived: newRequest._id },
      });

      //Añadimos la solicitud en el array de solicitudes enviadas
      await User.findByIdAndUpdate(id, {
        $push: { friendRequestsSent: newRequest._id },
      });

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_REQUEST_SENT_SUCCESS,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async respondToFriendRequest({ id, friendRequestId, status }) {
    try {
      const updatedFriendRequest = await FriendRequest.findByIdAndRemove(
        friendRequestId
      );

      if (!updatedFriendRequest) {
        throw new Error(USER_ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND);
      }

      const { sender } = updatedFriendRequest;

      if (status === STATUS_FRIEND_REQUEST.ACCEPTED) {
        await User.findByIdAndUpdate(id, { $push: { friends: sender } });
        await User.findByIdAndUpdate(sender, { $push: { friends: id } });
      }

      await User.findByIdAndUpdate(id, {
        $pull: { friendRequestsReceived: friendRequestId },
      });
      await User.findByIdAndUpdate(sender, {
        $pull: { friendRequestsSent: friendRequestId },
      });

      return {
        message: `${
          status === STATUS_FRIEND_REQUEST.ACCEPTED
            ? USER_SUCCESS_MESSAGES.FRIEND_REQUEST_ACCEPTED
            : USER_ERROR_MESSAGES.FRIEND_REQUEST_RECEIVED
        }`,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async cancelFriendRequest({ id, friendRequestId }) {
    try {
      const canceledFriendRequest = await FriendRequest.findByIdAndRemove(
        friendRequestId
      );

      if (!canceledFriendRequest) {
        throw new Error(USER_ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND);
      }

      const { receiver } = canceledFriendRequest;

      // Eliminar la solicitud de amistad de las propiedades en ambos usuarios
      await User.findByIdAndUpdate(id, {
        $pull: { friendRequestsSent: friendRequestId },
      });
      await User.findByIdAndUpdate(receiver, {
        $pull: { friendRequestsReceived: friendRequestId },
      });

      return {
        message: USER_SUCCESS_MESSAGES.FRIEND_REQUEST_CANCELLED,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async changePrivacyStatus({ id, isPrivate }) {
    try {
      const status = isPrivate === STATUS_PRIVACY.PRIVATE;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isPrivate: status },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
      }

      return {
        message: `${
          status
            ? USER_SUCCESS_MESSAGES.PRIVACY_STATUS_UPDATED_PRIVATE
            : USER_SUCCESS_MESSAGES.PRIVACY_STATUS_UPDATED_PUBLIC
        }`,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async searchUsers({ query, userId }) {
    try {
      if (!query) {
        return { message: "Empty query", data: [] };
      }

      const users = await User.find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }).select(NOT_SELECT_PASSWORD);

      const usersWithFriendRequestStatus = await Promise.all(
        users.map(async (user) => {
          const friendRequestSent = await FriendRequest.findOne({
            sender: userId,
            receiver: user._id,
            status: STATUS_FRIEND_REQUEST.PENDING,
          });

          const friendRequestReceived = await FriendRequest.findOne({
            sender: user._id,
            receiver: userId,
            status: STATUS_FRIEND_REQUEST.PENDING,
          });

          const areFriends = user.friends.includes(userId);

          const statusSent = friendRequestSent
            ? friendRequestSent.status
            : null;
          const statusReceived = friendRequestReceived
            ? friendRequestReceived.status
            : null;
          const sender = friendRequestSent ? friendRequestSent.sender : null;
          const receiver = friendRequestReceived
            ? friendRequestReceived.receiver
            : null;

          return {
            ...user.toObject(),
            friendRequestStatus: {
              sender,
              receiver,
              statusSent,
              statusReceived,
            },
            areFriends,
          };
        })
      );

      return {
        message: USER_SUCCESS_MESSAGES.USER_SEARCH_SUCCESSFUL,
        data: usersWithFriendRequestStatus,
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }
}

export default UsersServices;
