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

// Connexion à la base de données mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/blogdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Mongoose connection OK");
});

// Model Article
var ArticleSchema = new Schema({
    title: String,
    content: String,
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

var Article = mongoose.model('Article', ArticleSchema);

// GET Articles Index
app.get('/articles/', function(req, res) {
    // No query passed in means "find everything"
    Article.find(function(err, articles) {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            res.status(500).send(err);
        } else {
            // send the list of all people
            res.send(articles);
        }
    });
    /*
        MongoClient.connect("mongodb://mongo:27017/blogdb", function(err, db) {
            if (err) {
                // TODO return error 500...
                res.end("ERROR");
                return console.dir(err);
            }
            var articles = db.collection('articles');

            articles.find().toArray(function(err, items) {
                res.json(items);
            });
            // TODO return empty or 404 ...
            //    res.send('Hello world yeah 4\n');
            db.close();
        });
    */
});



// POST Articles Create
app.post('/articles/', function(req, res) {
    console.log("POST : /articles/");

    // Récupération des parametres
    var articleParams = {
        // POST body and x-www-form-urlencoded
        title: req.body.title,
        content: req.body.content
    };
    var article = new Article(articleParams);
    article.save(function(err, articleCreated) {
        if (err) {
            res.status(500).json(err);
        }
        // This createdTodoObject is the same one we saved, but after Mongo
        // added its additional properties like _id.
        else
            res.json(articleCreated);
    });
    //
    // MongoClient.connect("mongodb://mongo:27017/blogdb", function(err, db) {
    //     if (err) {
    //         // TODO return error 500...
    //         res.end("ERROR");
    //         return console.dir(err);
    //     }
    //     var articles = db.collection('articles');
    //
    //     articles.insert(article, {
    //         w: 1
    //     }, function(err, articles) {
    //         console.log("Record added as ", articles.ops[0]);
    //         // TODO http 201.
    //         res.json(articles.ops[0]);
    //     });
    //
    //     db.close();
    // });

    // TODO return empty
    //res.json(req.params);


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


// GET Articles Show
app.get('/articles/:id', function(req, res) {
    console.log("GET : /articles/" + req.params.id);
    Article.findById(req.params.id, function(err, article) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (article) {
                // Définit pour nous l'header de la réponse HTTP "Content-Type" à "application/json"
                res.json(article);
            } else {
                res.status(404).json({
                    message: "Not found",
                    value: req.params.id
                });
            }
        }
    });

});

// DELETE Articles deletion
app.delete('/articles/:id', function(req, res) {
    console.log("DELETE : /articles/");


    Article.findByIdAndRemove(req.params.id, function(err, article) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (article) {
                var response = {
                    message: "Article successfully deleted",
                    id: article._id,
                    article: article
                };
                res.json(response);
            } else {
                res.status(404).json({
                    message: "Not Found",
                    value: req.params.id
                });
            }
        }
    });

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

// Apparement inutile...
// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//     // TODO : Attention peux couper trop tôt la connection lors des tests...
//     mongoose.connection.close(function() {
//         console.log('Mongoose disconnected on app termination');
//         process.exit(0);
//     });
// });
