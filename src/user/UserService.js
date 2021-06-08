const User = require('./User');
const bcrypt = require('bcrypt');

const save = async (body) => {
  //hash password
  const hash = await bcrypt.hash(body.password, 7);

  const user = (({ username, email, password }) => ({
    username,
    email,
    password,
  }))({
    ...body,
    password: hash,
  });
  user.password = hash;
  //create user
  return User.create(user);
};
module.exports = { save };
