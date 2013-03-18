var urlParser = require('url').parse;

//Store the routes
var routes = {
	tweet: {
		add: true,
		find: true,
		update: true,
		remove: true
	}
};

exports.mapURL = function(url) {
	var urlInfo = urlParser(url, true),
		pathname = urlInfo.pathname,
		query = urlInfo.query
		callback = null;

	if (query.callback) {
		callback = query.callback;
		delete query.callback;
	}

	var s = pathname.split('/');
	if (s[1] && s[2] && routes[s[1]] && routes[s[1]][s[2]]) 
		return { 
			'controller': s[1], 
			'action': s[2],
			'query': query,
			'callback': callback
		}
	else
		return false;
}