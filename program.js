#!/usr/bin/env node
var connect     = require('connect');
var serveStatic = require('serve-static');
var httpProxy   = require('http-proxy');
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

var requestLog = function (req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
};

var errorLog = function (err, req, res, next) {
	console.error('ERROR: %s', err.toString());
};

var proxy = function (target) {
	var server = httpProxy.createProxyServer({ target: target });
	server.on('error', function (err, req, res) {
		res.writeHead(502, {
			'Content-Type': 'text/plain'
		});
		res.end('Could not proxy request:\n' + err.toString());
	});
	return function (req, res) {
		console.log('%s %s -> %s', req.method, req.url, target);
		server.web(req, res);
	};
};


var app = connect();
program.proxy.forEach(function (proxyOption) {
	var config = proxyOption.split('|');
	if (config.length !== 2) return;
	app.use(config[0].trim(), proxy(config[1].trim()));
});
app.use(requestLog);
app.use(restrict(patterns));
app.use(serveStatic(process.cwd()));
app.use(errorLog);
app.listen(program.listen, function (err) {
	if (err) {
		console.error('ERROR:\n%s', err);
		return;
	}
	console.log('listening on port: %d', program.listen);
	console.log('serving files from: %s', process.cwd());
});
