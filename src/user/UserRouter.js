const express = require('express');
const router = express.Router();
const userService = require('./UserService');

const validateUserName = (req, res, next) => {
  req.validationErrors = {}
  if (req.body.username === null)
    req.validationErrors.username = 'Username cannot be null';

  next();
}

const validateEmail = (req, res, next) => {
  if (req.body.email === null)
    req.validationErrors.email = 'Email cannot be null'

  next();
}

router.post('/',
  validateUserName, validateEmail,
  async (req, res) => {
    const validationErrors = req.validationErrors;
    if (Object.keys( validationErrors).length !== 0)
      return res.status(400).send({
        validationErrors
      });

    await userService.save(req.body);

    return res.send({message: 'User Created'});
  }
);

module.exports = router;
