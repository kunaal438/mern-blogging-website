import express, { json } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bycrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import admin from 'firebase-admin'
//schemer
import User from './Schema/User.js'
import serviceAccountKey from './react-js-blog-website-yt-bf3e5-firebase-adminsdk-ze7mr-51a6abd8c8.json' assert { type: 'json' }
import { getAuth } from 'firebase-admin/auth'

const server = express()
let PORT = 3000
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ // regex for password

server.use(express.json())
server.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
})

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
})

const generateUserName = async (email) => {
  try {
    let username = email.split('@')[0]
    let isUserNameNotUnique = await User.exists({
      personal_info: username,
    }).then((result) => result)
    isUserNameNotUnique ? (username += nanoid().substring(0, 5)) : ''
    return username
  } catch (error) {
    // Handle errors here
    console.error(error)
    throw new Error('Error generating username')
  }
}
const formatDataToSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)
  return {
    access_token: access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  }
}

server.post('/signup', (req, res) => {
  let { fullname, email, password } = req.body

  //validating data from frontend
  if (!fullname || fullname.length < 3) {
    //403 is for validation error
    return res
      .status(403)
      .json({ error: 'fullname must be at least 3 letters long' })
  }
  if (!email?.length) {
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

server.post('/signin', (req, res) => {
  let { email, password } = req.body
  User.findOne({ 'personal_info.email': email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: 'Email not found' })
      }
      if (!user.google_auth) {
        bycrypt.compare(
          password,
          user.personal_info.password,
          (err, result) => {
            if (err) {
              return res
                .status(403)
                .json({ error: 'Error occured while login please try again ' })
            }
            if (!result) {
              return res.status(403).json({ error: 'Invalied Password' })
            } else {
              return res.status(200).json(formatDataToSend(user))
            }
          }
        )
        //   console.log(user)
        //   return res.status(200).json({ status: 'got user document' })
      } else {
        return res
          .status(403)
          .json({
            error:
              'Account was created using google.Try looging in with google.',
          })
      }
    })
    .catch((err) => {
      console.log(err.message)
      return res.status(500).json({ error: err.message })
    })
})

server.post('/google-auth', (req, res) => {
  let { access_token } = req.body
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodeUser) => {
      let { email, name, picture } = decodeUser
      picture = picture.replace('s96-c', 's384-c')
      let user = await User.findOne({ 'personal_info.email': email })
        .select(
          'personal_info.fullname personal_info.username personal_info.profile_img google_auth'
        )
        .then((u) => {
          return u || null
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message })
        })

      if (user) {
        // login
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              'This email was signed up without google. Please log in with password to access the account',
          })
        }
      } else {
        // sign up
        let username = await generateUserName(email)

        user = new User({
          personal_info: {
            fullname: name,
            email,
            profile_img: picture,
            username,
          },
          google_auth: true,
        })
        await user
          .save()
          .then((u) => {
            user = u
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message })
          })
      }
      return res.status(200).json(formatDataToSend(user))
    })
    .catch((err) => {
      return res.status(500).json({
        error:
          'Faled to authenticate you with google. Try with some other google account',
      })
    })
})

server.listen(PORT, () => {
  console.log('listening on Port ->' + PORT)
})
