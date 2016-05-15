'use strict'

var express = require('express');
var session = require('express-session');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var sql = require('./DataBase/DbController.js');
var SequelizeStore = require('connect-session-sequelize')(session.Store);


app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

sql.startDB(); 

// var modelFactory = sql.getModelFactory;

// var dmUser = modelFactory().createDMUser();
// var dmDog = modelFactory().createDMDog();

// dmUser.hasMany(dmDog); 

// dmUser.sync().then(function (data){
// 	console.log("Users Synced");
// }).catch (function (err){
// 	throw new error(err);
// });

// dmDog.sync().then(function (data){
// 	console.log("Dogs Synced")
// }).catch(function (err){
// 	throw new error(err);
// })

// var testUser = dmUser.build({
// 	FirstName: "David",
// 	LastName: "Biderman",
// 	Radius: 6.37,
// 	DeviceID: "Fk3D-HH1L-R0f8-GGo5-RR33"
// });


app.get('/', function (req, res){
	var test = {
		firstName: "Eric",
		lastName: "Schoff",
		radius: 5.29,
		deviceID: "ik5E-HK7D-P01c-JXk3-31mX"
	}
	sql.insertNewClient(test, function (responseData){
		res.writeHeader(200, {"Content-Type": "text/html"})
		res.write(JSON.stringify(responseData, null, 4))
		res.end();
	});

})


var server = app.listen(3000, '0.0.0.0', function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server app listening at http://%s:%s', host, port);
});

