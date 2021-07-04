const express = require('express');
const router = express.Router();
const userService = require('./UserService');

const validateUserName = (req, res, next) => {
  const user = req.body;
  const validationErrors = {}
  if (user.username === null) {
    validationErrors.username = 'Username cannot be null';
  }
  if (user.email === null) {
    validationErrors.email = 'Email cannot be null';
  }

  if (Object.keys(validationErrors).length !== 0)
    return res.status(400).send({
      validationErrors
    });

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
