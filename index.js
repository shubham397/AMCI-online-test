const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');

var app = express();

// mongoose.connect('mongodb://localhost:27017/first');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req,res)=>{
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});