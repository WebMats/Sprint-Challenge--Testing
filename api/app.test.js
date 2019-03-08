const request = require('supertest');
const app = require('./app');

let id;
test('should return a list and a status of 200', async () => {
    const result = await request(app).get('/');
    const {status, body: games} = result;
    expect(status).toEqual(200);
    expect(Array.isArray(games)).not.toBeFalsy();
})

// test('should return game added', async () => {
//     const newGame = {title: 'Super Smash Bros. Ultimate', genre: 'Fighting', releaseYear: 2018}
//     const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
//     const {status, body} = result;
//     id = body.id;
//     const receivedObject = {title: body.title, genre: body.genre, releaseYear: body.releaseYear};
//     expect(status).toEqual(201);
//     expect(receivedObject).toMatchObject(newGame);
// })
test('should delete the game with right id', () => {
    const result = await request(app).delete(`/${id}`);
    expect(result.status).toEqual(201);
    expect(result.body.message).toMatch(/deleted/);
})

test('should return 422 status due to missing title', async () => {
    const newGame = {genre: 'Fighting', releaseYear: 2018}
    let result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame));
    const {status, body} = result;
    expect(status).toEqual(422);
    expect(body.errorMessage).toMatch(/Please provide both a title and a genre./);
})
test('should return 422 status due to missing genre', async () => {
    const newGame = {title: 'Super Smash Bros. Ultimate', releaseYear: 2018}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame));
    const {status, body} = result;
    expect(status).toEqual(422);
    expect(body.errorMessage).toMatch(/Please provide both a title and a genre./);
})

