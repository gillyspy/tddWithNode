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

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P@sswr0rd',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P@sswr0rd',
      })
      .then((response) => {
        expect(response.body.message).toBe('User Created');
        done();
      });
  });

  it('saves user to the database', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P@sswr0rd',
      })
      .then(() => {
        //query user table
        User.findAll().then((userList) => {
          console.log(userList);
          expect(userList.length).toBe(1);
          expect(userList[0].user = 'user1');
          expect(userList[0].email = 'user1@mail.com');
          done();
        });
      });
  });
});
