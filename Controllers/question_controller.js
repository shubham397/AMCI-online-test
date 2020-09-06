let Question = require('../Modals/question')

/*
get Question
*/
exports.getQuestion = (req, res) => {
    Question.find().then(result=>{
        res.send({
            status:"true",
            result:result,
        })
    }).catch(err=>{
        console.log(err);
        res.send({
            status:"false",
            result:err,
        })
    })
}