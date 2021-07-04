const express = require('express');
const router = express.Router();
const userService = require('./UserService');
const {check,validationResult} = require('express-validator');


router.post('/',
  check('username').notEmpty(),
    check('email').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    const validationErrors = {}
    if(!errors.isEmpty()){
      errors.array().forEach( error =>{
        validationErrors[error.param] = error.msg;
      })
      return res.status(400).send({validationErrors});
    }

    await userService.save(req.body);

    return res.send({message: 'User Created'});
  }
);

module.exports = router;
