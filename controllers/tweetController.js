var controllerInterface = require('./controllerInterface');

this.modelName = 'Tweet';

exports.add = function(tweetObj, callback) {
	controllerInterface.add.call(this, tweetObj, callback);
};

exports.find = function(obj, callback) {
	controllerInterface.find.call(this, obj, callback);
};

exports.update = function(query, callback) {
	controllerInterface.update.call(this, query, callback);
}

exports.remove = function(obj, callback) {
	controllerInterface.remove.call(this, obj, callback);
}