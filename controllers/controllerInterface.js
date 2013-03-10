var modelInterface = require('../models/modelInterface'),
	myutil = require('../myutil.js');

//Private: modolize 
function _modelize(name) {
	if (name) {
		return modelInterface.modelize(name);
	} 
}

exports.add = function(obj, callback) {
	if (!callback) callback = function() {};
 	if (obj && !myutil.isEmptyObject(obj)) {
 		obj.datetime = new Date();
 		obj.lastModified = new Date();
		var instance = new _modelize(this.modelName)(obj);
		modelInterface.add.call(instance, callback);
	} else 
		throw new Error('Parameter error.');
};

exports.find = function(obj, callback) {
	if (!obj) obj = {};
	if (!callback) callback = function() {};
	modelInterface.find.call(_modelize(this.modelName), obj, callback)
}

exports.update = function(query, callback) {
	if (query.id != undefined) {
		var cond = query.id;
			newR = query,
			opt = {};
		delete newR.id;
		newR.lastModified = new Date();
		modelInterface.update.call(_modelize(this.modelName), cond, newR, opt, callback);
	} else
		throw new Error('Parameter error.');
}

exports.remove = function(obj, callback) {
	if (obj && !myutil.isEmptyObject(obj)) {
		modelInterface.remove.call(_modelize(this.modelName), obj, callback);
	} else 
		throw new Error('Parameter error.');
}