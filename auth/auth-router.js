const router = require('express').Router();
const db = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./secret');


router.post('/register', verifyUser,(req,res) => {
  let {username, password} = req.user;
  db.insert({username,password: bcrypt.hashSync(password, 10)})
  .then(([id]) => {
    let token = generateToken(username,id)
    res.send({id,token})
  })
  .catch(err => {
    res.status(500).json({error: "Could not create user!"})
  })
})

router.post('/login', verifyUser, (req,res) => {
  let {username, password} = req.user;
  db.get({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      let token = generateToken(user.username, user.id)
      res.send({id: user.id, token})
    }else{
      res.status(401).json({message: "username and password invalid"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "error verifying the user"})
  })
})



function verifyUser(req,res,next) {
  let {username, password} = req.body;
  if(username && password) {
    req.user = {username, password};
    next();
  }else{
    res.status(401).json({message: "Please provide a username and password"})
  }
}

function generateToken(username,id){
  let payload = {
    user:username,
    subject: id
  }
  let options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload,secret,options)
}





module.exports = router;