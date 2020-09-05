const mongoose = require('mongoose');

var User = mongoose.Schema(
    {
       name:{type:String},
       email:{type:String},
       password:{type:String},
       score:{type:Number, default: 0},
    }
);


let user = module.exports = mongoose.model('user', User);