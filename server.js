'use strict';

require('dotenv').config();

var http = require('http');
var express = require('express');
var routes = require('./app/routes/index.js');

var app = express();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

var port = process.env.PORT || 8080;
var server = http.createServer(app);
app.server = server;
server.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
