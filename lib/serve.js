#!/bin/env node
var connect     = require('connect');
var serveStatic = require('serve-static');
var restrict    = require('./restrict');
var fs          = require('fs');

var port = process.argv[2] || process.env.PORT || 8080;

var patterns = fs.existsSync('.serveignore')
	? fs.readFileSync('.serveignore').toString().split(/\r?\n/)
	: [];

connect()
.use(restrict(patterns))
.use(serveStatic(process.cwd()))
.listen(port, function (err) {
	if (err) {
		console.log('ERROR:\n%s', err);
		return;
	}
	console.log('listening on port: %d', port);
	console.log('serving files from: %s', process.cwd());
});
