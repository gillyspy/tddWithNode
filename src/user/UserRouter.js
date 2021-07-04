const express = require('express');
const router = express.Router();
const userService = require('./UserService');

router.post('/', async (req, res) => {
  const user  = req.body;
  if( user.username === null){
    return res.status(400).send({
      validationErrors : {
        username : 'Username cannot be null'
      }
    });
  }

  await userService.save(req.body);

  return res.send({ message: 'User Created' });
});

module.exports = router;
