const request = require('supertest');
const app = require('./app');

let id;
test('should send back 200 status', async () => {
    const result = await request(app).get('/');
    expect(result.status).toEqual(200);
})

test('should return game added', () => {
    const newGame = {title: 'Super Smash Bros. Ultimate', genre: 'Fighting', releaseYear: 2018}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
    const {status, body} = result;
    id = body.id;
    const receivedObject = {title: body.title, genre: body.genre, releaseYear: body.releaseYear};
    expect(status).toEqual(201);
    expect(receivedObject).toMatchObject(newGame);
})

test('should return 422 status due to missing title', () => {
    const newGame = {genre: 'Fighting', releaseYear: 2018}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
    const {status, body} = result;
    expect(status).toEqual(422);
    expect(body.errorMessage).toMatch(/Please provide both a title and a genre./);
})
test('should return 422 status due to missing genre', () => {
    const newGame = {title: 'Super Smash Bros. Ultimate', releaseYear: 2018}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
    const {status, body} = result;
    expect(status).toEqual(422);
    expect(body.errorMessage).toMatch(/Please provide both a title and a genre./);
})