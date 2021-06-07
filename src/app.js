const express = require('express');
const User = require('../src/user/User.js');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.post('/api/v1/users', (req, res) => {
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
module.exports = app;
