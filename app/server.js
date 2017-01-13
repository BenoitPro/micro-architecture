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

    MongoClient.connect("mongodb://mongo:27017/blogdb", function(err, db) {
        if (err) {
            // todo return error 500...
            res.end("ERROR");
            return console.dir(err);
        }
        var articles = db.collection('articles');

        articles.find().toArray(function(err, items) {
            res.json(items);
        });
        //    res.send('Hello world yeah 4\n');
        db.close();
    });

});

app.get('/articles/:id', function(req, res) {
    console.log("GET : /articles/" + req.params.id);
    res.json(req.params);
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

// MONGO TEST
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
// Mongo mais du temps a se lancer et la tentative de connection plante
// car elle est réalisé avant que mongodb soit lancé...
// Todo Add waiting code for mongo to be ready...
// MongoClient.connect("mongodb://mongo:27017/blogdb", function(err, db) {
//     if (err) {
//         return console.dir(err);
//     }
//
//     // Get the documents collection
//     var collection = db.collection('articles');
//
//     //Create some users
//     var article1 = {
//         title: "Title 1 from mongo",
//         content: "Content 1"
//     };
//     var article2 = {
//         title: "Title 2 from mongo",
//         content: "Content 2"
//     };
//     var article3 = {
//         title: "Title 3 from mongo",
//         content: "Content 3"
//     };
//
//     // Insert some users
//     collection.insert([article1, article2, article3], function(err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('I Inserted %d documents into the "articles" collection. The documents inserted with "_id" are:', result.result.n, result);
//         }
//         // Close connection
//         db.close();
//     });
//
// });

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
