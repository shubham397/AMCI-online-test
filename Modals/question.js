const mongoose = require('mongoose');

var Question = mongoose.Schema(
    {
       question:{type:String},
       options:[ 
            {
                type:String
            }
        ],
       answer:{type:Number}
    }
);

let question = module.exports = mongoose.model('question', Question);

// question from - http://www.allindiaexams.in/engineering/cse/react-js-mcq-quiz-react-js-online-test/2
// db.questions.insert( { question: "What is a react.js in MVC?", options: ["Controller","Middleware", "Model","Router"], answer: 0 } )
// db.questions.deleteOne( {"_id": ObjectId("5f538789de0f4607d692f1c6")});