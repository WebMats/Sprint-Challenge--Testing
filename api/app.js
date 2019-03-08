const express = require('express');
const app = express();
const gamesDB = require('../games/gamesModel');

app.get('/', (req, res, next) => {
    gamesDB.getAll().then(games => {
        res.status(200).json(games)
    })
})
app.post('/', (req, res, next) => {
    const {title, genre} = req.body;
    if (!title || !genre) {
        return res.status(422).json({errorMessage: "Please provide both a title and a genre."})
    }
    try {
        
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not add game to database."})
    }
})



module.exports = app;