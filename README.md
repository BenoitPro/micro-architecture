# Moderne Full Stack Web and Micro Services Architecture

La stack sera également "Full Javascript" (avec du mongodb pour le SGBD NoSQL et Node.js + Express pour le serveur d'application).

L'idée est de réaliser un squelette d'application web "moderne" en utilisant les dernieres techno à la mode.

Ce n'est pas parce que votre techno préféré n'a pas été retenu ici quelle n'est pas "moderne". L'effervescence autour des technologies web n'a jamais été aussi forte que ces dernieres années et cela dans toutes les couches applicatives, des bases de données aux frameworks frontend.

Enfin, même si ce n'est pas parce qu'une techno est à la mode qu'elle est bonne, l'inverse est également vrai : Ce n'est pas parce qu'une techno est à la mode qu'elle est mauvaise. Le choix de technologies est spécifique à chaque projet et doit correspondre a de multiple critères

On va clairement séparer les rôles suivant :

* Frontend : Une webapp MVC tournera avec Backbones.js + React JS (mais aussi Bootstrap et SASS pour la couche CSS)
* Backend : Une API Rest MVC fonctionnera sous Node.js + Express
* Data : La base de données sera gérée en NoSQL par MongoDB.
* Sysadmin : L'administration system reposera sur des Microservices gérer par Docker.

Comme il faut bien choisir le type d'application qu'on va faire tourner, j'ai choisi de faire simple : Se sera une platforme de blog qui gerera une seule "ressource" : Des articles ! L'application pourra simplement créer, afficher et supprimer des articles...
