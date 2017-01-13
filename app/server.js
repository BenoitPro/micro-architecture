'use strict';

var express = require('express');
var bodyParser = require('body-parser');

// Constants
const PORT = 8080;

// App

var app = module.exports = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// config
// app.use(express.json());

///////////////
// data
////////////////

var articles = [{
    title: "Tile 1",
    content: "Content 1"
}, {
    title: "Title 2",
    content: "Content 2"
}];

app.get('/articles/', function(req, res) {
    res.json(articles);
    //    res.send('Hello world yeah 4\n');
});

app.get('/articles/:id', function(req, res) {
    console.log("GET : /articles/" + req.params.id);
    // posts.get(req.params.id, function(err, post, key) {
    //     if (err) {
    //         console.log("Erreur : ", err);
    //         res.json(err);
    //
    //     } else {
    //         post.id = key;
    //         res.json(post);
    //     }
    // });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

// REDIS TEST
var redis = require("redis"),
    client = redis.createClient({
        host: "redis"
    });

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function(err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function(reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
