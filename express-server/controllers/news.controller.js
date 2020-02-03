'use strict'
var NewsModel = require('../models/news.model');
const axios = require("axios");
const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";
var newsList = [];

//Method to get all news from api and save them to MongoDB
exports.saveNews = function(req, res) {
    console.log("calling saveNews method");
    axios.get(url)
        .then(data => {
            newsList = data.data.hits;
            newsList.forEach(news => {
                NewsModel.findOne({objectID: news.objectID}, function(err,obj) { 
                    if(obj == null){
                        news.is_deleted = false;
                        news.created_at = new Date(news.created_at);
                        NewsModel.create(news, function(err, news) {
                            if (err) {
                                return res.send('Error saving');
                            }
                        });
                    }
                });
            });
            if(res != null){
                res.status(200).send(data.data.hits);
            }
       })
       .catch(err => console.log(err));
}

//Method to get all news from MongoDB
exports.getNews = function(req, res) {
    console.log("calling getNews method");
    NewsModel.find((err, news) => {
        if(err)return res.status(500).send({message: 'Request error'});
        var news = news.sort((a, b) => b.created_at - a.created_at);
        return res.status(200).send({
            news
        });
    });
}

//Method to delete news from MongoDB
exports.deleteNews = function(req, res) {
    console.log("calling deleteNews method");
    NewsModel.findOne({
        objectID: req.body.params
    })
    .then((news) => {
        if(news != null) {
            news.is_deleted = true;
            news.save().then(() => {
                res.jsonp({ news });
            });
        }
    });
}
