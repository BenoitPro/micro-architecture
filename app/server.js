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

// GET Articles
// Index Action
app.get('/articles/', function(req, res) {
    // Pas de requete donné en paramètres signifie "find everything"
    Article.find(function(err, articles) {
        if (err) {
            // Renvoye d'une erreur HTTP 500 si un pb avec la bd à au lieu
            res.status(500).send(err);
        } else {
            // send the list of all people
            res.send(articles);
        }
    });

});



// POST Articles
// Create Action
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
        } else
            res.json(articleCreated);
    });

});


// GET an Article
// Show Action
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

// DELETE Articles
// DESTROY action
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
