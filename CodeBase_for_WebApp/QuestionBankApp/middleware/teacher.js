const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if (user.userType !== 'teacher') {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.status(200).json({ message: 'Access Granted' });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
