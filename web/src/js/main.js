console.log('Main.js');

var AppView = Backbone.View.extend({
    // el - stands for element. Every view has an element associated with HTML content, will be rendered.
    el: '#container',
    // It's the first function called when this view is instantiated.
    initialize: function() {
        this.render();
    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
    render: function() {
        this.$el.html("Hello TutorialsPoint!!!");
    }
});

var appView = new AppView();


// 'Router' is a name of the router class
var Router = Backbone.Router.extend({

    //The 'routes' maps URLs with parameters to functions on your router
    routes: {
        "myroute": "myFunc"
    },

    //'The function 'myFunc' defines the links for the route on the browser
    myFunc: function(myroute) {
        document.write(myroute);
    }
});

//'router' is an instance of the Router
var router = new Router();

//Start listening to the routes and manages the history for bookmarkable URL's
Backbone.history.start();

//////////////////////
$(document).ready(function() {
    console.log("ready 6!");
    console.log("window.blog", "window.blog");

    // Permet d'accéder à nos variables en mode console
    window.app = {};

    /*--- Modèle article ---*/

    //  Sorte de classe Article
    app.Article = Backbone.Model.extend({
        // les valeurs par défaut d'un article
        defaults: {
            title: "titre de l'article",
            content: "contenu de l'article",
            // publishedAt: new Date()

        },
        // s'exécute à la création d'un article
        initialize: function() {
            console.log("Création d'un nouvel article");

            this.set("publishedAt", new Date());
        }
    });

    // Collection
    app.Articles = Backbone.Collection.extend({
        model: app.Article,
        initialize: function() {
            console.log("Création d'une collection d'articles")
        }
    });

    /*--- bootstrap ---*/
    app.articles = new app.Articles();

    app.articles.add(new app.Article({
        title: "titre1",
        content: "contenu1"
    }));
    app.articles.add(new app.Article({
        title: "titre2",
        content: "contenu2"
    }));
    app.articles.add(new app.Article({
        title: "titre3",
        content: "contenu3"
    }));
    app.articles.add(new app.Article({
        title: "titre4",
        content: "contenu4"
    }));
    app.articles.add(new app.Article({
        title: "titre5",
        content: "contenu5"
    }));



    /*--- Vues ---*/
    app.ArticlesView = Backbone.View.extend({
        el: $("#articles-container"),

        initialize: function() {
            this.template = _.template($("#articles-tpl").html());

            /*--- binding ---*/
            _.bindAll(this, 'render');

            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            /*---------------*/
        },

        render: function() {
            var renderedContent = this.template({
                articles: this.collection.toJSON()
            });
            $(this.el).html(renderedContent);
            return this;
        }
    });

    articlesView = new app.ArticlesView({
        collection: app.articles
    });
    articlesView.render();

});
