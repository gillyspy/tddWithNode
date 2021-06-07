const request = require('supertest');
const app = require('../app');

it('returns 200 OK when signup request is valid', () => {
  request(app).post('/api/v1/users').send({
    username: 'user1',
    email: 'user1@mail.com',
    password: 'P@sswr0rd',
  });
});
