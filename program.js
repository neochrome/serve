#!/bin/env node
var connect     = require('connect');
var serveStatic = require('serve-static');
var proxy       = require('http-route-proxy');
var restrict    = require('./restrict');
var fs          = require('fs');
var program     = require('commander');
var package     = require('./package.json');

var patterns = fs.existsSync('.serveignore')
	? fs.readFileSync('.serveignore').toString().split(/\r?\n/)
	: [];

program
	.version(package.version)
	.option('-l, --listen [PORT]', 'Listen on PORT, defaults to [8080].', 8080)
	.option('-p, --proxy [PATH|DEST]', 'Proxy requests matching PATH to DEST. Multiple proxies supported.', function (value, memo) { memo.push(value); return memo; }, [])
	.parse(process.argv);

var app = connect();
app.use(function (req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});
app.use(restrict(patterns));
program.proxy.forEach(function (proxyOption) {
	var config = proxyOption.split('|');
	if (config.length !== 2) return;
	app.use(config[0], proxy.connect({ to: config[1] }));
});
app.use(serveStatic(process.cwd()));
app.listen(program.listen, function (err) {
	if (err) {
		console.error('ERROR:\n%s', err);
		return;
	}
	console.log('listening on port: %d', program.listen);
	console.log('serving files from: %s', process.cwd());
});
