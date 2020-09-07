const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

var app = express();
app.use(cors())

const userName = "shubham_task";
const password = "database_task1";
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