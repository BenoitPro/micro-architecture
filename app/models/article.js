// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

// Rendre Article disponible dans les controlleurs
module.exports = Article;
