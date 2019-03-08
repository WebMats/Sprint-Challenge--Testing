const db = require('../data/dbConfig');



const insert = async (game) => {
    const [id] = await db('games').insert(game);
    return db('games').where({id}).first();
}

const getAll = () => {
    return db('games')
}

const remove = (id) => {
    return db('games').where({id}).delete();
}

module.exports = {
    insert,
    getAll,
    remove
}