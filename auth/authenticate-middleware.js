const jwt = require('jsonwebtoken');
const {secret} = require('./secret');

module.exports = (req,res,next) => {
  let {authorization} = req.headers;
  jwt.verify(authorization, secret, (err, decodedToken) => {
    if(err) {
      res.status(401).json({you: "shall not pass!"})
    }else {
      next();
    }
  })
}