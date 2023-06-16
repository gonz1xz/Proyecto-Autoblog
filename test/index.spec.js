const app = require('../src/routes/app')
const request = require('supertest')

describe('GET /', () => {

    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/signup').send;
        console.log(response);
    });

});