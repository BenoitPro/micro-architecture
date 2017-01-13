console.log('Main.js')

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


//'Router' is a name of the router class
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

$(function() {
    //permettra d'accéder à nos variables en mode console
    window.blog = {};

    /*--- Modèle article ---*/

    // une "sorte" de classe Article
    blog.Article = Backbone.Model.extend({
        //les valeurs par défaut d'un article
        defaults: {
            title: "titre de l'article",
            content: "contenu de l'article",
            publishedAt: new Date()
        },
        // s'exécute à la création d'un article
        initialize: function() {
            console.log("Création d'un nouvel article")
        }
    });

});
