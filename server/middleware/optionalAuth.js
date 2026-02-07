import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const secret = process.env.JWT_SECRET || "default-secret-key";
      const decoded = jwt.verify(token, secret);
      if (decoded && decoded.id) {
        req.user = decoded;
      }
    }
  } catch (err) {
    // Ignore invalid tokens for optional auth
  }
  next();
};

export default optionalAuth;
