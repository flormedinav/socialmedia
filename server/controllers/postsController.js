import PostsServices from "../services/postsServices.js";

const services = new PostsServices();

class PostsController {
  constructor() {}

  async getAllPosts(req, res) {
    try {
      const response = await services.getAllPosts();

      res.json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getFeedPosts(req, res) {
    try {
      const { page, perPage } = req.query;
      const { userId } = req.params;

      const response = await services.getFeedPosts({ userId, page, perPage });

      res.json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUserPosts(req, res) {
    try {
      const { page, perPage } = req.query;
      const { userId } = req.params;

      const response = await services.getUserPosts({ userId, page, perPage });

      res.json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createPost(req, res) {
    try {
      const { userId } = req.params;
      const { description, picture } = req.body;

      const response = await services.createPost({
        userId,
        description,
        picture,
      });

      res.status(201).json(response);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }

  async editPost(req, res) {
    try {
      const { userId, postId } = req.params;
      const { description, picture } = req.body;

      const response = await services.editPost({
        userId,
        postId,
        description,
        picture,
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { userId, postId } = req.params;

      const response = await services.deletePost({
        userId,
        postId,
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async likePost(req, res) {
    try {
      const { postId, userId } = req.params;

      const response = await services.likePost({ postId, userId });

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addComment(req, res) {
    try {
      const { userId, postId } = req.params;
      const { text } = req.body;

      const response = await services.addComment({ userId, postId, text });

      res.status(201).json(response);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }

  async editComment(req, res) {
    try {
      const { postId, commentId } = req.params;

      const { text } = req.body;

      const response = await services.editComment({ postId, commentId, text });

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { postId, commentId } = req.params;

      const response = await services.deleteComment({ postId, commentId });

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default PostsController;
