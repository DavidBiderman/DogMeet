'use strict'

var winston = require('winston');

var getLogger = function(){
	return new (winston.Logger)({
		transports:[
			new (winston.transports.File)({filename: "DogMeet.log", json: false})
		]
	})
}

module.exports = {
	getLogger: getLogger
}