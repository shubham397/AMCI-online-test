let User = require('../Modals/user')

/*
    Add User to mongoDB
*/
exports.addUser = (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    console.log("name - "+name+" email - "+email+" password - "+password);

    User.create({
        "name": name,
        "email": email,
        "password": password,
    })
        .then(user => {
            res.redirect('/user/show');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/user/add');
        });
}

/*
login User
*/
exports.loginUser = (req, res) => {
    User.find().then(result=>{
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

/*
logout User
*/
exports.logoutUser = (req, res) => {
    User.find().then(result=>{
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

/*
logout User
*/
exports.getHighScore = (req, res) => {
    User.find({}).then(result=>{
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