import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config'
import bcrypt from 'bcrypt'
import User from './Schema/User.js'


const PORT = process.env.PORT || 3000;
const server = express();

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json())
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true 
})


server.post("/signup", (req, res) => {
  let {fullname, email, password} = req.body;
  
  //validating the datafrom frontend
  if(fullname.length<3) 
  {
    return res.status(403).json({"error":"Full name be must be atleast 3 letters long"})
  }
   
  if(!email.length) {
    return res.status(403).json({"error":"Enter Email"})
  }

  if(!emailRegex.test(email)){
    return res.status(403).json({"error":"Email is invalid"})

  }
  if(!passwordRegex.test(password)){
    return res.status(403).json({"error":"Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter"})

  }

  bcrypt.hash(password, 10, (error, hashed_password)=>{
    if (error) {
      return res.status(500).json({ "error": "Error hashing password" });
  }
 
  let username = email.split("@")[0];


  let user = new User({
    personal_info: {fullname ,email, 
    password: hashed_password, username}
  })

  user.save().then((u)=>{
    return res.status(200).json({user: u})
  })
  .catch(err=>{
    return res.status(500).json({"error": err.message})
  })
})


// return res.status(200).json({"status": "okay"})

})

  server.listen(PORT, (email) => {
  console.log(`Server listening on port ${PORT}`);
});