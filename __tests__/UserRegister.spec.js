const request = require('supertest');
const app = require('..');
const User = require('../src/user/User.js');
const sequelize = require('../src/config/database.js');

//init database before all
beforeAll(() => {
  return sequelize.sync();
});

//clean before each test
beforeEach(() => {
  return User.destroy({ truncate: true });
});

const _t = {
  validUser1: {
    username: 'user1',
    email: 'user1@mail.com',
    password: 'P@sswr0rd',
  },
};

const _f = {
  regUser: function (app, path, user) {
    return request(app).post(path).send(user);
  },
  regUser1: function ( user = _t.validUser1) {
    return _f.regUser(app, '/api/1.0/users', user);
  },
};

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', async () => {
    const response = await _f.regUser1();
    expect(response.status).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const response = await _f.regUser1();
    expect(response.body.message).toBe('User Created');
  });

  it('saves user to the database', async () => {
    await _f.regUser1();

    //query user table
    const userList = await User.findAll();
    console.log(userList);
    let u = userList[0];
    expect(userList.length).toBe(1);
    expect((u.username = _t.user1.username));
    expect((u.email = _t.user1.email));
  });

  it('hashes the password in the database', async () => {
    await _f.regUser1();
    //query user table
    const userList = await User.findAll();
    let u = userList[0];
    expect(u.password).not.toBe(_t.user1.password);
  });

  it('returns 400 when username is null', async()=>{
    //null user
    const invalidUser = Object.assign({},_t.user1, { username : null});

    const response = await _f.regUser1(invalidUser);
    expect( response.status).toBe(400);
  });
});
