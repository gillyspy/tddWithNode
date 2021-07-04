const express = require('express');
const router = express.Router();
const userService = require('./UserService');
const {
  check,
  validationResult
} = require('express-validator');

router.post('/',
  check('username')
    .notEmpty().withMessage('Username cannot be null')
    .bail()
    .isLength({min : 4, max: 32}).withMessage('Username must have at least 4 characters and no more than 32 characters'),
  check('email').notEmpty().withMessage('Email cannot be null')
  .bail()
    .isEmail().withMessage('Email is not valid'),
  check('password').notEmpty().withMessage('Password cannot be null')
  .bail()
    .isLength({min : 4, max: 32}).withMessage('Password must have at least 4 characters and no more than 32 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    const validationErrors = {}
    if (!errors.isEmpty()) {
      errors.array().forEach(error => {
        validationErrors[error.param] = error.msg;
      })
      return res.status(400).send({validationErrors});
    }

    await userService.save(req.body);

    return res.send({message: 'User Created'});
  }
);

module.exports = router;
