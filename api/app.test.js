const request = require('supertest');
const app = require('./app');

let id;
test('should return a list and a status of 200', async () => {
    const result = await request(app).get('/');
    const {status, body: games} = result;
    expect(status).toEqual(200);
    expect(Array.isArray(games)).not.toBeFalsy();
})

test('should return game added', async () => {
    const newGame = {title: 'Super Smash Bros. Ultimate', genre: 'Fighting', releaseYear: 2018}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
    const {status, body} = result;
    id = body.id;
    const receivedObject = {title: body.title, genre: body.genre, releaseYear: body.releaseYear};
    expect(status).toEqual(201);
    expect(receivedObject).toMatchObject(newGame);
})
test('should return status 405 when adding game with same title', async () => {
    const newGame = {title: 'Super Smash Bros. Ultimate', genre: 'Fighting'}
    const result = await request(app).post('/').set('Content-Type', 'application/json').send(JSON.stringify(newGame))
    expect(result.status).toEqual(405)
    expect(result.body.errorMessage).toMatch(/Game with that title already exists./)
})
test('should delete the game with right id', async () => {
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
test('should return game with corresponding id and status 200', async () => {
    const result = await request(app).get('/1');
    const {status, body} = result;
    expect(status).toEqual(200);
    expect(body).toBeDefined();
})
test('should return 404 when id does not exist', async () => {
    const result = await request(app).get('/100');
    const {status, body} = result;
    expect(status).toEqual(404);
    expect(body.errorMessage).toMatch(/game with that id does not exist./i)
})