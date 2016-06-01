var express = require('express');
var recive = require('../models/reciveData');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
/**
 * 斗鱼数据传输
 * 以json传输
 */
router.post('/douyu', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body,'douyu');
    res.json({msg:'success'})
});

module.exports = router;
