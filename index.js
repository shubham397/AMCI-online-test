const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')

var app = express();
app.use(cors())

mongoose.connect('mongodb://localhost:27017/task');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const users = require('./Routes/user');

app.use('/user', users);

const questions = require('./Routes/question');

app.use('/question', questions);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});