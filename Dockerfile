FROM node:6.9.4-alpine

# Create app directory
RUN mkdir /src

# Install app dependencies
# COPY package.json /usr/src/app/
RUN npm install nodemon -g

WORKDIR /src

#COPY app/package.json /usr/src/app/package.json
ADD app/package.json /src/package.json

RUN npm install

# Bundle app source (a garder pour le déployement en prod ?)
# COPY app /src
# => inutile car monté par le volume lors d'un docker-compose...
# => a remettre lors d'un docker build / run ...
ADD app/nodemon.json /src/nodemon.json

EXPOSE 8080

# package.json demarre avec nodemon...
# todo a changer en production...
# donc changer le package.json en prod cf plus haut
# CMD [ "npm", "start" ]
CMD npm start
