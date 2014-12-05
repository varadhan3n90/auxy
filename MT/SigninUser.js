var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var express = require('express');
var neo4j = require('neo4j');
var bodyParser = require('body-parser');

var db = new neo4j.GraphDatabase('http://localhost:7474');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

var params={}
var output;

function createUser(username, password){	
	var querystring = 'MATCH (user:User { username:\''+username+'\', password:\''+password+'\' }) return user;';
	//console.log(querystring);
	var query=[querystring].join('\n');
	db.query(query, params, function(err, results){
		if(err){			
			output = err.message;
		}		
		else if(results){
			output = results;
			
		}
	});
}

exports.ex_SignupUser = function(request, response){
	var username = request.param('username');
	var password = request.param('password');
	authorizeUser(username, password);
	console.log(output);
	return output;
}

