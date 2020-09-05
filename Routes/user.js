const express = require("express");
const router = express.Router();

const {addUser, loginUser, logoutUser, getHighScore} = require('../Controllers/user_controller');

router.post('/signUp', addUser); //POST
router.get('/login',loginUser);//GET
router.get('/logout',logoutUser);//GET
router.get('/getHighScore',getHighScore);//GET

module.exports = router;