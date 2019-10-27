const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    date: String,
    imgUrl: String,
    answers: Array,
    keyword: String,
    SentimentScore: Object,
    Sentiment: String,
    LanguageScore: String
});

// Create Entry class (blueprint)
const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;