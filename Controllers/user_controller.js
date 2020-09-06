let User = require('../Modals/user')

/*
    Add User to mongoDB
*/
exports.addUser = (req, res) => {
    var name = req.body.user.name;
    var score = req.body.user.score;

    User.create({
        "name": name,
        "score": score
    })
        .then(user => {
            res.send({status:"true"})
        })
        .catch((err) => {
            console.log(err);
        });
}

/*
logout User
*/
exports.getHighScore = (req, res) => {
    User.find({}).sort( { score : -1} ).then(result=>{
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