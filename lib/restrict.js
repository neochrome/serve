var url       = require('url');
var path      = require('path');
var minimatch = require('minimatch');

module.exports = function (patterns) {
	patterns = patterns || [];
	
	return function (req, res, next) {
		var requestedFile = path.relative('/', url.parse(req.url).pathname);
		var match = function (pattern) { return minimatch(requestedFile, pattern); };
		if (patterns.some(match)) {
			console.log('restricted access: %s', requestedFile);
			res.statusCode = 401;
			res.end('Unauthorized\n');
		} else {
			next();
		}
	};
};
