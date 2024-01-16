import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bycrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'

//schemer
import User from './Schema/User.js'

const server = express()
let PORT = 3000
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ // regex for password

server.use(express.json())

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
})

const generateUserName = async (email) => {
  let username = email.split('@')[0]
  let isUserNameNotUnique = await User.exists({ personal_info: username }).then(
    (result) => result
  )
  isUserNameNotUnique ? (username += nanoid().substring(0, 5)) : ''
  return username
}
const formatDataToSend = (user) => {
  return {
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  }
}

server.post('/signup', (req, res) => {
  let { fullname, email, password } = req.body

  //validating data from frontend
  if (fullname.length < 3) {
    //403 is for validation error
    return res
      .status(403)
      .json({ error: 'fullname must be at least 3 letters long' })
  }
  if (!email.length) {
    return res.status(403).json({ error: 'Enter Email' })
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: 'Invalid Email' })
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        'password should be 6 to 20 long with a numeric, 1 lowercase and 1 Uppercase',
    })
  }
  bycrypt.hash(password, 10, async (err, hash_password) => {
    let username = await generateUserName(email)
    let user = new User({
      personal_info: { fullname, email, password: hash_password, username },
    })
    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u))
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: 'Email already exist' })
        }
        //500 general error code
        return res.status(500).json({ error: err.message })
      })
  })
})

server.listen(PORT, () => {
  console.log('listening on Port ->' + PORT)
})
