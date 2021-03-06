# Moderne Full Stack Web and Micro Services Architecture

La stack sera également "Full Javascript" (avec du mongodb pour le SGBD NoSQL et Node.js + Express pour le serveur d'application et backbone pour la couche front).

L'idée est de réaliser un squelette d'application web "moderne" en utilisant les dernieres technos à la mode.

Comme vous le savez surement il y a beaucoup de technologies ""à la mode" apparues ces dernières années. Et cela dans toutes les couches applicatives du frontend avec notamment les frameworks JS tel que Angular, React, Backbones etc.

Ce n'est pas parce que votre techno préférée n'a pas été retenue ici qu'elle n'est pas "moderne". L'effervescence autour des technologies web n'a jamais été aussi forte que ces dernieres années et cela dans toutes les couches applicatives.

Enfin, même si ce n'est pas parce qu'une techno est à la mode qu'elle est bonne, l'inverse est également vrai : Ce n'est pas parce qu'une techno est à la mode qu'elle est mauvaise. Le choix de technologies est spécifique à chaque projet et doit répondre à de multiple critères.

On va clairement séparer les rôles suivant :

* Frontend : Une webapp MVC tournera avec Backbones.js + React JS (mais aussi Bootstrap et SASS pour la présentation CSS)
* Backend : Une API Rest MVC fonctionnera sous Node.js + Express
* Data : La base de données sera gérée en NoSQL par MongoDB.
* Sysadmin : L'administration system reposera sur des Microservices gérés par Docker.

Comme il faut bien choisir le type d'application qu'on va faire tourner, j'ai choisi de faire simple : Ce sera une platforme de blog qui gerera une seule "ressource" : Des articles ! L'application pourra simplement créer, afficher et supprimer des articles...
