var express = require('express');
var recive = require('../models/reciveData');
// var getTags = require("../models/getTags.js");
var TagTimer = require("../controler/TagUtils.js");
// var UtilsCreateBriefTable = require("../Utils/UtilsCreateBriefTable");
var CreateBrief = require("../models/CreateBrief");
var danmu = require('../models/danmu');
var dmBilibili = require('../models/danmuBilibili');
var InsertRoom = require('../models/insertDMRoom');
var dmpandatv = require('../models/pandatv');
var dmyy = require('../models/danmuyy');
var danmuLZ = require('../models/danmulz');
var danmuLF = require('../models/danmu_laifeng');
var danmuIK = require('../models/danmu_ingkee');
var danmuSix = require('../models/danmu_sixrooms');
var danmuHuya = require('../models/danmu_huya');
var EMC = require('../models/EMC');
var ReadDB = require('../models/readDB');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
/**
 * 斗鱼数据传输where are you
 * 以json传输
 */
router.post('/douyu', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'douyu');
    res.json({msg: 'success'})
});
router.post('/huya', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'huya');
    res.json({msg: 'success'})
});
router.post('/bilibli', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'bilibli');
    res.json({msg: 'success'})
});
router.post('/panda', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'panda');
    res.json({msg: 'success'})
});
router.post('/yy', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'yy');
    res.json({msg: 'success'})
});
router.post('/sixrooms', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'sixrooms');
    res.json({msg: 'success'})
});
router.post('/longzhu', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'longzhu');
    res.json({msg: 'success'})
});
router.post('/huajiao', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'huajiao');
    res.json({msg: 'success'})
});
router.post('/laifeng', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'laifeng');
    res.json({msg: 'success'})
});
router.post('/ingkee', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'ingkee');
    res.json({msg: 'success'})
});
router.get('/log', function (req, res, next) {
    var platform = req.query.platform;
    var action = req.query.action;
    var amount = req.query.amount;
    recive.log(platform, action, amount);
    res.json({msg: 'success'})

});
router.get('/getAllTag', function (req, res, next) {
    if (TagTimer.TagTimer()) {
        res.json({msg: 'success,开始...'})
    } else {
        res.json({msg: '还有个任务在进行中'})
    }
});
router.get('/test', function (req, res, next) {
    CreateBrief.test();
    res.json({msg: '测试接口'})

});
router.post('/dm', function (req, res, next) {
    var platform = req.query.platform;
    var roomId = req.query.room_id;
    console.log(platform + roomId);
    danmu.DanMuSave(platform, roomId, req.body);
    InsertRoom.InsertRoom(platform, roomId);
    res.json({msg: 'success'})

});
router.post('/dmBilibili', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("Bilibili" + roomId);
    dmBilibili.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("bilibli", roomId);
    res.json({msg: 'success'});

});

router.post('/dmPandatv', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("PandaTv: " + roomId);
    dmpandatv.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("panda", roomId);
    res.json({msg: 'success'});

});

router.post('/dmYY', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("YY: " + roomId);
    dmyy.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("YY", roomId);
    res.json({msg: 'success'});

});

router.post('/dmLaiFeng', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("laifeng: " + roomId);
    danmuLF.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("laifeng", roomId);
    res.json({msg: 'success'});

});

router.post('/dmLZ', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("LZ: " + roomId);
    danmuLZ.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("LongZhu", roomId);
    res.json({msg: 'success'});

});

router.post('/dmIngkee', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("ingkee: " + roomId);
    danmuIK.DanMuSave(roomId, req.body);
    // InsertRoom.InsertRoom("ingkee", roomId);
    res.json({msg: 'dmIngkee success'});

});

router.post('/dmSixrooms', function (req, res, next) {
    var roomId = req.query.room_id;
    console.log("sixrooms: " + roomId);
    danmuSix.DanMuSave(roomId, req.body);
    InsertRoom.InsertRoom("sixrooms", roomId);
    res.json({msg: 'dmSixrooms success'});

});

router.post('/dmHuya', function (req, res, next) {
    var roomId = req.body.roomid;
    console.log("huya: " + roomId);
    danmuHuya.DanMuSave(roomId, req.body.data);
    InsertRoom.InsertRoom("huya", roomId);
    res.json({msg: 'dmHuya success'});

});

router.post('/spforIngkee', function (req, res, next) {
    InsertRoom.InsertIngkeeRoom(req.body);
    res.json({msg: 'spforIngkee success'});
});

router.get('/getRooms', function (req, res, next) {
    ReadDB.getRooms(req.query.platform, req.query.topn, function (err, rows) {
        if (err) {
            return res.json({msg: 'err'});
        }
        res.json({msg: 'success', data: rows});
    })
});
router.get('/emcUpdate', function (req, res, next) {
    EMC.emcUpdate();
    res.json({msg: 'success'});
});

router.post('/insertCR',function (req, res, next) {
    var platform = req.body.platform;
    InsertRoom.InsertSpecialRoom(platform, req.body.rooms);

    // console.log("platform: " + platform);
    res.json({msg: 'insert success'});

    // res.json({msg: 'success',rooms: req.body.rooms});
});

router.get('/insertCR',function (req, res, next) {
    var platform = req.query.platform;
    // InsertRoom.InsertRoom(platform, req.body.rooms);

    console.log("platform: " + platform);
    res.json({msg: 'success'});

    // res.json({msg: 'success',rooms: req.body.rooms});
});
// router.get('/test1',function (req, res, next) {
//     // CreateBrief.startCreate();
// });
module.exports = router;
