const express = require('express');
const User = require('../src/user/User.js');

const app = express();
app.use(express.json());

app.post('/api/v1/users', (req, res) => {
  console.log('req.body',req.body);

  User.create(req.body)
    .then(() => {
      return res.send({
        message: 'User Created',
      });
    })
    .catch((e) => {
      console.log(e);
    });
});
module.exports = app;
