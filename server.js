//The actual server is http-server from npm
// This is some additional utils

var chokidar = require('chokidar');
var autoprefixer = require('autoprefixer');

function autoPrefixer(path) {
	postcss([ autoprefixer ]).process(css, {from: path, to: path}).then(function (result) {
    	result.warnings().forEach(function (warn) {
        	console.warn(warn.toString());
    	});
		fs.writeFileSync(path, result.css);
		console.log('Finished Parsing!');
	});
}

console.log("Autoprefix CSS");

var watcher = chokidar.watch(__dirname + '/css/index.min.css', {
  ignored: /[\/\\]\./,
  persistent: true
});

watcher.on('change', function (path) {
	autoPrefixer(path);
	console.log("Began Parsing CSS");
});

console.log("Starting livereload server...");
livereload = require('livereload');
server = livereload.createServer();
server.watch([__dirname, __dirname + "/css"]);
console.log("Done!");
