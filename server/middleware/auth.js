const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const { JWT_SECRET } = process.env;

function authMiddleware (req, res, next) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded

    next()
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
};

module.exports = authMiddleware