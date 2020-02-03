'use strict'
var express = require('express');
const cron = require("node-cron");
var NewsController = require('../controllers/news.controller');
var router = express.Router();


cron.schedule("0 0 */1 * * *", function() {
    NewsController.saveNews();
},{
    scheduled: true,
    timezone: "America/Santiago"
});

router.get('/', function (req, res) {
    res.send('It is working!');
});

//Get all news from api and save them into MongoDB
router.get('/save/news', NewsController.saveNews);

//Delete news from MongoDB
router.put('/delete/news', NewsController.deleteNews);

//Get all news from MongoDB
router.get('/news', NewsController.getNews);

//Export router
module.exports = router;