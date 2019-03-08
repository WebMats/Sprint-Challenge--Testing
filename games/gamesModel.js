const db = require('../data/dbConfig');



const insert = async (game) => {
    const [id] = await db('games').insert(game);
    return db('games').where({id}).first();
}

const getAll = () => {
    return db('games')
}
const getOne = (object) => {
    const field = Object.keys(object)[0]
    return db('games').where({[field]: object[field]}).first();
}

const remove = (id) => {
    return db('games').where({id}).delete();
}

module.exports = {
    insert,
    getAll,
    getOne,
    remove
}