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

// Petit middleware pour logguer les requêtes HTTP reçus.
router.use(function(req, res, next) {
    console.log(req.method, "/articles" + req.url);
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
            res.send(articles);
        }
    });
});

// POST Articles
// Create Action
router.post('/', function(req, res) {

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
// SHOW Action
router.get('/:id', function(req, res) {
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
router.delete('/:id', function(req, res) {

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


module.exports = router;
