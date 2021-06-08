const express = require('express');
const router = express.Router();
const userService = require('./UserService');

router.post('/', async (req, res) => {
  await userService.save(req.body);

  return res.send({ message: 'User Created' });
});

module.exports = router;
