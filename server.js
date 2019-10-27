const express = require('express');
const app = express();

const router = express.Router();
const mongoose = require('mongoose');

const entries = require('./routes/entries')


/***********
 * MIDDLEWARE
 ***********/

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/entries', entries);

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
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));