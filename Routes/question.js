const express = require("express");
const router = express.Router();

const {getQuestion} = require('../Controllers/question_controller');

router.get('/getQuestion',getQuestion);//GET

module.exports = router;