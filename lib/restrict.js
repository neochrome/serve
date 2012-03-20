var parse = require('url').parse;
var path = require('path');

module.exports = function restrict(files){
	files = files || [];
	return function(req, res, next){
		var requestedFile = path.basename(parse(req.url).pathname);
		if(files.indexOf(requestedFile) !== -1){
			console.log('restricted access:', requestedFile);
			res.statusCode = 401;
			res.end('Unauthorized');
		} else {
			next();
		}
	};
};
