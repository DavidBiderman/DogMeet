'use strict'
var Sequelize = require('sequelize');
var _dogModel;
var _logger = require('../helpers/utils.js').getLogger();

var createDMDog = function (sequelize){
	_dogModel = sequelize.define('dmdogs',{
		DogID: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true
		},
		DogName: {
			type: Sequelize.STRING
		},
		DogSize: {
			type: Sequelize.STRING
		},
		Breed: {
			type: Sequelize.STRING
		},
		Age: {
			type: Sequelize.INTEGER
		},
		Temperment: {
			type: Sequelize.INTEGER
		},
		OwnerId: {
			type: Sequelize.STRING,
			references: 'dmusers',
			referencesKey: 'UserID'
		}
	})
	return _dogModel
}

var insertNewDog = function(dmDogObject, callback){
	_logger.info("Entered insertNewDog");
	var dogToInsert = _dogModel.build({
		DogName: dmDogObject.dogName,
		DogSize: dmDogObject.dozSize,
		Breed: dmDogObject.breed,
		Age: dmDogObject.age,
		Temperment: dmDogObject.temperment,
		OwnerId: dmDogObject.ownerId
	});
  
	dogToInsert.save().then((responseData) => {
		_logger.info("Inserted new dog successfully");
		callback({
			ActionId: "InsertNewDog",
			Error: null,
			Status: "Success",
			Data: responseData
		});
	});
}

module.exports = {
	createDMDog: createDMDog,
	insertNewDog: insertNewDog
}