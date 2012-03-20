function configure(){
	var path = require('path');
	var configFile = path.resolve(process.cwd(), '.serve.json');
	var config = {};
	if(path.existsSync(configFile)){
		config = require(configFile);
	} else {
		console.log('using default settings');
	}
	config.restrictedFiles = config.restrictedFiles || [];
	config.port = config.port || 8080;

	return config;
}
var config = configure();

var connect = require('connect');
connect()
	.use(require('./restrict.js')(config.restrictedFiles))
	.use(connect.static(process.cwd()))
	.listen(config.port);
console.log('serving on port:', config.port);
