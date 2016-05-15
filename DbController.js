'use strict'
var Sql = require('./DBConnectionLayer.js');
var Models = require('./ModelFactory.js');

var _dbController;
var _modalFactory;
var _userModal;
var _dogModal;

var _initDbConnection = function(){
	_dbController = Sql.getDBConnection();
};

var _syncDBTables = function(){
	//Create DB modal objects to sync with database
	_modalFactory = Models.getModelFactory();
	_userModal = _modalFactory.createDMUser(_dbController);
	_dogModal = _modalFactory.createDMUser(_dbController);

	//Creates many to one relationship between dog and user (owner)
	_userModal.hasMany(_dogModal);
	
	//Sync the modals with the DB, create tables in case of new DB
	_userModal.sync().then(function (data){
		console.log("Users Synced");
	});
	_dogModal.sync().then(function (data){
		console.log("Dogs Synced");
	});
}

var startDB = function(){
	_initDbConnection();
	_syncDBTables();
}

var insertNewClient = function (dmUserObject, callback){
	var userToInsert = _userModal.build({
		FirstName: dmUserObject.firstName,
		LastName: dmUserObject.lastName,
		Radius: dmUserObject.radius,
		DeviceID: dmUserObject.deviceID
	})

	userToInsert.save().then(function (data){
		console.log("Inserted new client into the system");
		callback ({
			ActionId: "InsertClient",
			Error: null,
			Status: "Success",
			Data: data
		})
	})
}



module.exports = {
	startDB: startDB,
	insertNewClient: insertNewClient
}



