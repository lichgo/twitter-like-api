var db = require('./db/connect'),
	route = require('./route'),
	http = require('http');

//db.reg(cacheData);

//Create and start the server
var server = http.createServer(function(req, res) {
	var data = '';

	req.on('data', function(input) {
		data += input;
	}).on('end', function() {
		requestHandler(req, res, data);
	});
}).listen(8080);

function requestHandler(req, res, data) {
	//Use url to identify the controller and action
	var actionInfo = route.mapURL(req.url);
	if (!actionInfo) pageHandler['404'](req, res);
	else {
		try {
			controllers[actionInfo.controller][actionInfo.action](actionInfo.query, function(result) {
				try {
					var json = JSON.stringify(result);
					if (actionInfo.callback) json = callback + '(' + json + ');';
					pageHandler['200'](req, res, json);
				} catch (err) {
					pageHandler['500'](req, res, err);
				}
			});
		} catch (err) {
			pageHandler['500'](req, res, err);
		}
	}
};

var controllers = {
	'tweet': require('./controllers/tweetController')
};

var pageHandler = {
	'200': function(req, res, output) {
		res.writeHead(200, {'Content-Type':'application/json'});
		res.end(output);
	},
	'404': function(req, res) {
		res.writeHead(404, {'Content-Type':'application/json'});
		res.end(JSON.stringify({ 'error': 'Page Not Found' }));
	},
	'500': function(req, res, err) {
		res.writeHead(500, {'Content-Type':'application/json'});
		res.end(JSON.stringify({ 'error': 'Server Error: ' + err }));
	}
}