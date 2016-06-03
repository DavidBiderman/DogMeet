'use strict'
var Sequelize = require('sequelize');
var _userModel;
var _logger = require('../helpers/utils.js').getLogger();


var createDMUser =  function (sequelize){
	_userModel = sequelize.define('dmusers', {
		UserID:{
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true
		},
		FirstName: {
			type: Sequelize.STRING
		},
		LastName: {
			type: Sequelize.STRING
		},
		Radius: {
			type: Sequelize.DOUBLE
		},
		DeviceID: {
			type: Sequelize.STRING
		}
	})
	return _userModel;
}

var insertNewClient = function (dmUserObject, callback){
	_logger.info("Entered insertNewClient")
	var userToInsert = _userModel.build({
		FirstName: dmUserObject.firstName,
		LastName: dmUserObject.lastName,
		Radius: dmUserObject.radius,
		DeviceID: dmUserObject.deviceID
	})

	userToInsert.save().then((data) => {
		_logger.info("insertNewClient Successful");
		callback({
			Status: "Successful",
			Data: data,
			Error: null
		})
	});
}

var findUserById = function(loginData, callback){
	_userModel.findById(loginData.username).then((data) => {
		callback(data.dataValues);
	})
}

module.exports = {
	createDMUser: createDMUser,
	insertNewClient: insertNewClient,
	findUserById: findUserById
}