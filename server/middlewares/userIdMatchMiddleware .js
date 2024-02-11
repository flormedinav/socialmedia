const userIdMatchMiddleware = (req, res, next) => {
  const { userId } = req.params;
  const { id: tokenUserId } = req.user;

  if (userId !== tokenUserId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  next();
};

export default userIdMatchMiddleware;
