const db = require('../data/dbConfig');



const insert = async (game) => {
    const [id] = await db('games').insert(game);
    return db('games').where({id}).first();
}