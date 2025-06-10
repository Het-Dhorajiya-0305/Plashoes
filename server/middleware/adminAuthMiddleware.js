import jwt from 'jsonwebtoken';

const verifyAdmin = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    console.log('Received headers:', req.headers);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No token or invalid format');
      return res.status(401).json({
        success: false,
        message: 'Not authorized: No token provided or invalid format',
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted token:', token);


    const token_decode = await jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);
    console.log('Decoded token:', token_decode); 

   
    if (!token_decode.isAdmin) {
      console.error('User is not an admin:', token_decode);
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
      });
    }

    req.user = token_decode;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again.',
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
};

export default verifyAdmin;