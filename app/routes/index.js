'use strict';

var path = process.cwd();

module.exports = function (app) {
    app.get('/', function (req, res) {
		res.sendfile(path + '/public/index.html');
	});

};