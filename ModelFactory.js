'use strict'
var Sequelize = require('sequelize')

var DBObjectFactory = {
	createDMUser: function (sequelize){
		return sequelize.define('dmusers', {
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
		}, {
			freezeTableName: true
		}) 
	},
	createDMDog: function (sequelize){
		return sequelize.define('dmdogs',{
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
			}
		})
	}
}


module.exports = {
	getModelFactory: function() {
		return DBObjectFactory;
	}
}