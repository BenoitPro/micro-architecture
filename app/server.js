'use strict';

var express = require('express');
var bodyParser = require('body-parser');

// Constants
const PORT = 8080;

// App
var app = module.exports = express();
var router = express.Router();


// Petit middleware pour logguer les requêtes HTTPs reçus.
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// config
// app.use(express.json());

///////////////
// data
////////////////

// apply the routes to our application

var router = require('./controllers/articles_controller');
app.use('/articles', router);

app.listen(PORT);
try {
    console.log('Running on http://' + require('os').networkInterfaces().ethf0[0].address + ":" + PORT);
} catch (e) {
    console.log("cannot get server ip");
}

/*
// REDIS TEST
var redis = require("redis"),
    client = redis.createClient({
        host: "redis"
    });



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
*/
// Apparement inutile...
// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//     // TODO : Attention peux couper trop tôt la connection lors des tests...
//     mongoose.connection.close(function() {
//         console.log('Mongoose disconnected on app termination');
//         process.exit(0);
//     });
// });
