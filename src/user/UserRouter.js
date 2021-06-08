const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  //hash password
  bcrypt.hash(req.body.password, 7).then((hash) => {
    //extract relevant  user info from body
    const user = (({ username, email, password }) => ({
      username,
      email,
      password,
    }))({ ...req.body, password: hash });
    user.password = hash;
    //create user
    User.create(user)
      .then(() => {
        //send response
        return res.send({
          message: 'User Created',
        });
      })
      .catch((e) => {
        console.log('catch block', e);
        return res.status(500).send({ message: 'something went wrong' });
      });
  });
});

module.exports = router;