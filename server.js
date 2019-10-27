const express = require('express');
const app = express();
const mongoose = require('mongoose');
const entries = require('./routes/entries')


/***********
 * MIDDLEWARE
 ***********/
// Enable CORS....(Janky get-around)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// Enable CORS in development mode for a cheap work-around lol
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/***********
 * ROUTES
 ***********/
app.use('/entries', entries);

const uri = 'mongodb://localhost/journal';
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch(err => console.log("Cannot connect."));

/***********
 * PORT
 ***********/
const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));