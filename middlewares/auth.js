const jwt = require('jsonwebtoken');
const {redisClient}=require("../helpers/redis")
require("dotenv").config();
const protect = async (req, res, next) => {
  let token;
  let temp= await redisClient.get(req._remoteAddress);
  console.log({temp});
  if (temp||req.headers.authorization) {
    token = `${temp}`||req.headers.authorization.split(' ')[1];
  }
  console.log({token});
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.role=decoded.role;
    if(decoded){
        next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed',error:error.message });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: `You are not authorized` });
    }
    next();
  };
};

module.exports = { protect, authorize };
