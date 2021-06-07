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
  user1: {
    username: 'user1',
    email: 'user1@mail.com',
    password: 'P@sswr0rd',
  },
};

const _f = {
  regUser: function (app, path, user) {
    return request(app).post(path).send(user);
  },
  regUser1: function () {
    return _f.regUser(app, '/api/v1/users', _t.user1);
  },
};

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    _f.regUser1().then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('returns success message when signup request is valid', (done) => {
    _f.regUser1().then((response) => {
      expect(response.body.message).toBe('User Created');
      done();
    });
  });

  it('saves user to the database', (done) => {
    _f.regUser1().then(() => {
      //query user table
      User.findAll().then((userList) => {
        console.log(userList);
        expect(userList.length).toBe(1);
        expect((userList[0].username = _t.user1.username));
        expect((userList[0].email = _t.user1.email));
        done();
      });
    });
  });

  it('hashes the password in the database', (done) => {
    _f.regUser1().then(() => {
      //query user table
      User.findAll().then((userList) => {
        let u = userList[0];
        expect(u.password).not.toBe( _t.user1.password );
        done();
      });
    });
  });
});
