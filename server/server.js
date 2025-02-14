global.config = require('./config').get('dev');

const restify = require("restify");
const path = require("path");
const recursiveReaddir = require("recursive-readdir");

//Cria o servidor
const server = restify.createServer({
    name: 'Delivery',
    version: '1.0'
});

