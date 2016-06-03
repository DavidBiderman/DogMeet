'use strict'

var Sequelize = require('sequelize');

var sequelize = null;

module.exports = {
	getDBConnection: function(){
		if(!sequelize){
			sequelize = new Sequelize('dogmeet', 'root', 'Password1', {
				dialect : 'mysql',
				pool: {
					max: 5,
					min: 0,
					idle: 10000
				}
			});
		}
		return sequelize;
	}
}