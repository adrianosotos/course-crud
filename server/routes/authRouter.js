
const express = require('express')
const User = require('../database/models/user')
const jwt = require('jsonwebtoken')
const router = express.Router()

function signToken (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}

async function createUserToken (user, code, req, res) {
  const token = signToken(user._id)

  let cookieDate = new Date()
  cookieDate.setDate(cookieDate.getDate() + 30)

  user.password = undefined; 
  res.status(code).json({
    status: 'success',
    jwt: token,
    data: {
      user
    }
  });
};

router.post('/register', async function (req, res) { 
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send({
      msg: 'Missing required fields'
    })
  }

  try {
    const user = await User.findOne({ email })

    if (user) {
      res.status(400).send({
        msg: 'User already exists'
      })
    }
    
    const newUser = await User.create({
      email,
      password,
    });

    createUserToken(newUser, 201, req, res);
  } catch(err) {
    console.log(err)
  }
})

router.post('/login', async function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({
      msg: 'Missing required fields'
    })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || password !== user.password) {
    return res.status(400).send({
      msg: 'Incorrect user or password'
    })
  }

  createUserToken(user, 200, req, res);
})

router.get('/logout', async function (req, res) {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true
  })

  res.status(200).send({
    message: 'user is logged out'
  })
})

module.exports = router