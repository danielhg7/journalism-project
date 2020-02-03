'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = Schema({
    created_at: Date,
    title: String,
    url: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id: Number,
    objectID: Number,
    is_deleted: Boolean
});

//Export model
module.exports = mongoose.model('news', NewsSchema);