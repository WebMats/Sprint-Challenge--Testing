const express = require('express');
const gamesDB = require('../games/gamesModel');

const app = express();
app.use(express.json());

app.get('', (req, res, next) => {
    gamesDB.getAll().then(games => {
        res.status(200).json(games)
    })
})
app.get('/:id', (req, res, next) => {
    gamesDB.getOne({id: req.params.id}).then(result => {
        res.status(200).json(result)
    })
})

app.post('', async (req, res, next) => {
    const {title, genre} = req.body;
    if (!title || !genre) {
        return res.status(422).json({errorMessage: "Please provide both a title and a genre."})
    }
    const gameFound = await gamesDB.getOne({title: title});
    if (gameFound) {
        return res.status(405).json({errorMessage: "Game with that title already exists."})
    }
    try {
        const {releaseYear} = req.body || 'tbd'
        gamesDB.insert({title, genre, releaseYear}).then(result => {
            res.status(201).json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not add game to database."})
    }
})
app.delete('/:id', (req, res, next) => {
    gamesDB.remove(req.params.id).then(result => {
        if(!result < 1) {
            res.status(201).json({message: 'deleted'})
        }
    })
})



module.exports = app;