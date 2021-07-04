const express = require('express');
const router = express.Router();
const userService = require('./UserService');

const validateUserName = (req, res, next) => {
  const user = req.body;
  if (user.username === null) {
    return res.status(400).send({
      validationErrors: {
        username: 'Username cannot be null'
      }
    });

  }
  next();
}

router.post('/',
  validateUserName,
  async (req, res) => {
    await userService.save(req.body);

    return res.send({message: 'User Created'});
  }
);

module.exports = router;
