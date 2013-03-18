var mongoose = require('mongoose');

var _handlerList = [];
exports.reg = function(handler) {
	_handlerList.push(handler);
}

//Connect to db
mongoose.connect('mongodb://localhost/mytwitter');
var db = mongoose.connection;
db.on('error', function(err) {
	console.log('Db connection failed: ' + err);
}).once('open', function() {
	console.log('Db mytwitter connected now!');
	for (var h in _handlerList) {
		_handlerList[h]();
	}
});

//Schema design
var schemas = {};

var tweetSchema = mongoose.Schema({
	author: String,
	title: String,
	content: String,
	datetime: Date,
	lastModified: Date
});
schemas['Tweet'] = tweetSchema;

global.schemas = schemas;
