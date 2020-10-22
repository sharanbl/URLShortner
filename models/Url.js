const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema); //Exporting as a model with the name Url and the schema urlSchema