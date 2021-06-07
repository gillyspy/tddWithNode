const request = require('supertest');
const app = require('../app');

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
