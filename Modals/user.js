const mongoose = require('mongoose');

var User = mongoose.Schema(
    {
       name:{type:String},
       score:{type:Number, default: 0},
    }
);

let user = module.exports = mongoose.model('users', User);

// db.users.insert( { name:"Shubham", email:"shubham@gmail.com", password:"123456", score:0 } )