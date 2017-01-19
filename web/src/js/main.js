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
    console.log("ready 8!");

    // Permet d'accéder à nos variables en mode console
    window.app = {};

    // BACKBONE SYNC
    // POST need

    var proxiedSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        options || (options = {});
        if (!options.crossDomain) {
            options.crossDomain = true;
        }
        console.log("Backbone.sync options.crossDomain", options.crossDomain);
        //  if (!options.xhrFields) {
        //    options.xhrFields = {withCredentials:true};
        //  }
        return proxiedSync(method, model, options);
    };

    /*--- Modèle article ---*/

    //  Sorte de classe Article
    app.Article = Backbone.Model.extend({

        urlRoot: "http://0.0.0.0:8080/articles",
        // // les valeurs par défaut d'un article
        defaults: {
            title: "titre de l'article",
            content: "contenu de l'article",
            // publishedAt: new Date()

        },
        idAttribute: "_id", // l'id en mongodb
        // s'exécute à la création d'un article
        initialize: function() {
            console.log("Création d'un nouvel article");

            this.set("publishedAt", new Date());
        },
        sync: function(method, collection, options) {
            // options.dataType = "jsonp";
            return Backbone.sync(method, collection, options);
        }
    });

    // Collection
    app.Articles = Backbone.Collection.extend({
        model: app.Article,
        url: "http://0.0.0.0:8080/articles/",
        // all: function() {
        //     this.url = "/articles/5878dbb839909e00f962c368";
        //     return this;
        // },
        initialize: function() {
            console.log("Création d'une collection d'articles")
        },
        sync: function(method, collection, options) {
            // By setting the dataType to "jsonp", jQuery creates a function
            // and adds it as a callback parameter to the request, e.g.:
            // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
            // If you want another name for the callback, also specify the
            // jsonpCallback option.
            // After this function is called (by the JSONP response), the script tag
            // is removed and the parse method is called, just as it would be
            // when AJAX was used.
            options.dataType = "jsonp";
            return Backbone.sync(method, collection, options);
        }
    });

    // app.abc = new app.Article({
    //     _id: "5878dbb839909e00f962c368"
    // });
    // console.log("abc id ", app.abc.get("id"));
    // console.log("abc new? ", app.abc.isNew());
    // app.abc.fetch({
    //     success: function(result) {
    //         console.log("abc", app.abc);
    //         console.log("abc title", app.abc.get("title"));
    //     }
    // });

    app.articles = new app.Articles();
    app.articles.fetch({
        success: function(collection, response, options) {
            // console.log(collection);
            // console.log(response);
            // console.log(options);

            console.log("app.articles", app.articles);
        },
        error: function(collection, response, options) {
            console.log(response.statusText);
        },
        // A timeout is the only way to get an error event for JSONP calls!
        timeout: 5000
    });


    //
    //  View
    //

    // Articles View
    app.ArticlesView = Backbone.View.extend({
        el: $("#articles-container"),

        initialize: function() {
            this.template = _.template($("#articles-tpl").html());

            // Fait dans mainView
            // _.bindAll(this, 'render');
            //
            // this.collection.bind('change', this.render);
            // this.collection.bind('add', this.render);
            // this.collection.bind('remove', this.render);
        },

        render: function() {
            var renderedContent = this.template({
                articles: this.collection.toJSON()
            });
            this.$el.html(renderedContent);
            return this;
        }
    });

    app.SidebarView = Backbone.View.extend({
        el: $("#blog_sidebar"),
        initialize: function() {
            this.template = _.template($("#blog_sidebar_template").html());
        },
        render: function() {
            var renderedContent = this.template({
                articles: _.first(this.collection.models, 3)
            });
            this.$el.html(renderedContent);
            return this;
        }
    });

    var articlesView = new app.ArticlesView({
        collection: app.articles
    });
    var sidebarView = new app.SidebarView({
        collection: app.articles
    });
    // articlesView.render();

    app.MainView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);

            this.sidebarView = sidebarView;
            this.articlesView = articlesView;

        },
        render: function() {
            // this.sidebarView.collection = ;
            this.sidebarView.render();
            this.articlesView.render();
        }
    });
    var mainView = new app.MainView({
        collection: app.articles
    });


});
