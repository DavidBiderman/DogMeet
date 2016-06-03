'use strict'
var Sql = require('../models/DBConnectionLayer.js');
var UserModel = require('../models/dmUserModel.js');
var DogModel = require('../models/dmDogModel.js');

var _dbConnection;
var _userModel;
var _dogModel;

var _initDbConnection = function(){
	_dbConnection = Sql.getDBConnection(); 
};

var _syncDBTables = function(){
	//Create DB modal objects to sync with database
	_userModel = UserModel.createDMUser(_dbConnection);
	_dogModel = DogModel.createDMDog(_dbConnection);

	//Creates many to one relationship between dog and user (owner)
	_userModel.hasMany(_dogModel); 
	
	//Sync the modals with the DB, create tables in case of new DB
	_userModel.sync().then((data) => {
		console.log("Users Synced");
	});
	_dogModel.sync().then((data) => {
		console.log("Dogs Synced");
	});
}

var startDB = function(){
	_initDbConnection();
	_syncDBTables();
}

var insertNewClient = function (dmUserObject, callback){
	UserModel.insertNewClient(dmUserObject, (data) => {
		callback({
			Status: "Successful",
			Data: data,
			Error: null
		})
	})
}

var insertNewDog = function(dmDogObject, callback){
	DogModel.insertNewDog(dmDogObject, (data) => {
		callback({
			Status: "Successful",
			Data: data,
			Error: null
		})
	})
}

var findUserById = function(loginData, callback){
	_userModel.findById(loginData.username).then((data) => {
		callback(data.dataValues);
	})
}


module.exports = {
	startDB: startDB,
	insertNewClient: insertNewClient,
	insertNewDog: insertNewDog,
	findUserById: findUserById
}



