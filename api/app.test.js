const request = require('supertest');
const app = require('./app');


test('should send back 200 status', async () => {
    const result = await request(app).get('/');
    expect(result.status).toEqual(200);
})