# How to run application on local machine

## Installation

- Install [NodeJS](https://nodejs.org/en/) lts or latest version
- Install [Docker](https://www.docker.com/get-started/)

- In root dir run `npm install`
- In root dir run `docker-compose up` to setup postgres docker image for local development
- Create a .env file with the 3 parameters: PORT (e.g. 3000 by default), MONGO_URI (see docker-compose.yml) and SECRET (e.g. secret)

## Start the application
npm run start

Application runs on [localhost:3000](http://localhost:3000) by default.