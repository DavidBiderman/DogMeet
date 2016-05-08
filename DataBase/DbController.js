'use strict'

var Sequelize = require('sequelize');

var sequelize = new Sequelize('dogmeet', 'root', 'Password1', {
	dialect : 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});


var DBObjectFactory = {
	createDMUser: function(){
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
	createDMDog: function(){
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
};