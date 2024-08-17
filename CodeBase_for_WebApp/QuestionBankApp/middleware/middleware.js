const isAdmin = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
      next(); // User is admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({
        status: 'error',
        message: 'Forbidden! Admin access required'
      });
    }
  };
  
  module.exports = {
    isAdmin
  };
  