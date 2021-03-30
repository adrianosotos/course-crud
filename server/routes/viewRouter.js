const express = require('express')
const User = require('../database/models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { promisify } = require('util');

router.post('/', async function (req, res) {
  const { token } = req.body

  if (!token) {
    return res.status(401).send({
      message: 'Unathorized user'
    })
  }

  
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    console.log(user)
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router