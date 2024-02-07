import UsersServices from "../services/usersServices.js";

const services = new UsersServices();

class UsersController {
  constructor() {}

  async getUser(req, res) {
    try {
      const { userId } = req.params;

      const response = await services.getUser(userId);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserFriends(req, res) {
    try {
      const { userId } = req.params;

      const response = await services.getUserFriends(userId);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const { userId } = req.params;

      const response = await services.getAllUsers(userId);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addRemoveFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const response = await services.addRemoveFriend({ userId, friendId });

      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const response = await services.removeFriend({ id: userId, friendId });

      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getFriendRequestsReceived(req, res) {
    try {
      const { userId } = req.params;

      const friendRequestsReceived = await services.getFriendRequestsReceived(
        userId
      );

      res.json(friendRequestsReceived);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getFriendRequestsSent(req, res) {
    try {
      const { userId } = req.params;

      const friendRequestsSent = await services.getFriendRequestsSent(userId);

      res.json(friendRequestsSent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async sendFriendRequest(req, res) {
    try {
      const { userId, friendId } = req.params;

      const response = await services.sendFriendRequest({
        id: userId,
        friendId,
      });

      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async respondToFriendRequest(req, res) {
    try {
      const { userId, friendRequestId, status } = req.params;

      const updatedFriendRequest = await services.respondToFriendRequest({
        id: userId,
        friendRequestId,
        status,
      });

      res.json(updatedFriendRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changePrivacyStatus(req, res) {
    try {
      const { userId, isPrivate } = req.params;

      const updatedPrivacyStatus = await services.changePrivacyStatus({
        id: userId,
        isPrivate,
      });

      res.json(updatedPrivacyStatus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async searchUsers(req, res) {
    try {
      const { query } = req.query;
      const { userId } = req.params;

      const searchResults = await services.searchUsers({ query, userId });

      res.json(searchResults);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UsersController;
