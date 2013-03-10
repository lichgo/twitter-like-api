var mongoose = require('mongoose');

//Store mongodb models
this.models = {};

//Create mongodb model and store it in cache, return a mongodb model
exports.modelize = function(name) {
	var model = this.models[name];
	if (model) return model;
	return this.models[name] = mongoose.model(name, schemas[name]);
};

//Add
exports.add = function(callback) {
	this.save(function(err, result) {
		if (err) throw new Error('Failed to save data: ' + err);
		callback(result);
	});
};

//Find
exports.find = function(obj, callback) {
	this.find(obj, function(err, result) {
		if (err) throw new Error('Failed to find data: ' + err);
		callback(result);
	});
};

//Update
exports.update = function(cond, newR, opt, callback) {
	this.findByIdAndUpdate(cond, newR, opt, function(err, result) {
		if (err) throw new Error('Failed to update: ' + err);
		callback(result);
	});
}

//Delete
exports.remove = function(obj, callback) {
	this.remove(obj, function(err, result) {
		if (err) throw new Erro('Failed to delete: ' + err);
		callback(result);
	});
}