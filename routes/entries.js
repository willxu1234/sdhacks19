const mongoose = require('mongoose');
const express = require('express');
const Entry = require('../models/Entry')
const router = express.Router();

router.get('/', async (req, res) => {
    const entries = await Entry.find().sort('date');
    res.send(entries);
});

router.post('/', async (req, res) => {
    let entry = new Entry({
        time: req.body.time,
        imgUrl: req.body.imgUrl,
        answers: req.body.answers,
        keyword: req.body.keyword,
        SentimentScore: req.body.SentimentScore,
        Sentiment: req.body.Sentiment,
        LanguageScore: req.body.LanguageScore
    });
    entry = await entry.save();

    res.send(entry);
});

router.delete('/:id', async (req, res) => {
    const entry = await Entry.findByIdAndDelete(req.params.id);

    if (!entry) return res.status(404).send('The entry with the given ID was not found.');

    res.send(entry);
});

router.put('/:id', async (req, res) => {
    const entry = await Entry.findByIdAndUpdate(req.params.id, {
        time: req.body.time,
        imgUrl: req.body.imgUrl,
        answers: req.body.answers,
        keyword: req.body.keyword,
        SentimentScore: req.body.SentimentScore,
        Sentiment: req.body.Sentiment
    }, {
        new: true
    });

    if (!entry) return res.status(404).send('The entry with the given ID was not found.');

    res.send(entry);
});

router.get('/:id', async (req, res) => {
    const entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).send('The entry with the given ID was not found.');

    res.send(entry);
});

module.exports = router;