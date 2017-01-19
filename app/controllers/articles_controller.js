var express = require('express');
var router = express.Router();

// Model Article
var Article = require('../models/article');

// Connexion à la base de données mongo
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/blogdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose connection OK");
});

// Petit middleware pour logguer les requêtes HTTP reçus
router.use(function(req, res, next) {
    console.log(req.method, "/articles" + req.url, "params", req.params);
    next();
});

// Petit middleware pour ajouter l'header HTTP Access-Control-Allow-Origin.
router.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    // Pour les requetes POST par Backbone.js
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

// GET Articles
// Index Action
router.get('/', function(req, res) {

    // Pas de requete donné en paramètres signifie "find everything"
    Article.find(function(err, articles) {
        if (err) {
            // Renvoye d'une erreur HTTP 500 si un pb avec la bd à au lieu
            res.status(500).send(err);
        } else {
            // send the list of all people
            res.jsonp(articles);
        }
    });
});

// POST Articles
// Create Action
router.post('/', function(req, res) {

    console.log("POST params req.body", req.body);
    // Récupération des parametres
    var articleParams = {
        // POST body and x-www-form-urlencoded
        title: req.body.title,
        content: req.body.content
    };
    var article = new Article(articleParams);
    article.save(function(err, articleCreated) {
        if (err) {
            res.status(500).jsonp(err);
        } else
            res.jsonp(articleCreated);
    });
});

// GET an Article
// SHOW Action
router.get('/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        if (err) {
            res.status(500).jsonp(err);
        } else {
            if (article) {
                // Définit pour nous l'header de la réponse HTTP "Content-Type" à "application/jsonp"
                res.jsonp(article);
            } else {
                res.status(404).jsonp({
                    message: "Not found",
                    value: req.params.id
                });
            }
        }
    });
});

// DELETE Articles
// DESTROY action
router.delete('/:id', function(req, res) {

    Article.findByIdAndRemove(req.params.id, function(err, article) {
        if (err) {
            res.status(500).jsonp(err);
        } else {
            if (article) {
                var response = {
                    message: "Article successfully deleted",
                    id: article._id,
                    article: article
                };
                res.jsonp(response);
            } else {
                res.status(404).jsonp({
                    message: "Not Found",
                    value: req.params.id
                });
            }
        }
    });

});


module.exports = router;
