import jwt from "jsonwebtoken";

const authorizationMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  const token = authorizationHeader.substring(7);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    }

    req.user = user;
    next();
  });
};

export default authorizationMiddleware;
