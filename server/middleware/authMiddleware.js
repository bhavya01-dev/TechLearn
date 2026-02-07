import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify JWT token using the same secret as in userController
    const secret = process.env.JWT_SECRET || 'default-secret-key';
    const decodedUser = jwt.verify(token, secret);
    
    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }
    
    req.user = decodedUser;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
