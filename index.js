const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');

var app = express();
app.use(cors())

dotenv.config({ path: '.env' });

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
console.log(password)
mongoose.connect(`mongodb://${userName}:${password}@ds261817.mlab.com:61817/task`, 
    {useNewUrlParser: true },function(err){
    {
        if(err) {
            console.log('Some problem with the connection ' +err);
        } else {
            console.log('The Mongoose connection is ready');
        }
    }})

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