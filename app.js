const express = require('express');

const app = express();


app.post('/api/v1/users', (req, res)=>{

  return res.send({
    message : 'User Created'
  });
})
module.exports = app;