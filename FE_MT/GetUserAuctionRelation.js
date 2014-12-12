var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var express = require('express');
var session = require('express-session');
var neo4j = require('neo4j');
var bodyParser = require('body-parser');
var json = require('json');

var db = new neo4j.GraphDatabase('http://localhost:7474');

var app = express();
app.use(session({secret:'secret', resave:true, saveUninitialized:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

var params={}

exports.ex_GetUserAuctionRelation = function(request, response, callback){
	var session = request.session;
	console.log("GetUserAuctionRelation - hi user: "+session.username);
	if((session.username!=undefined)){
		var querystring = "MATCH (user:User{username:\'"+session.username+"\'})-[r]->(bid:Bid) return bid.bidname,type(r)";	 		
		//var querystring = "MATCH (user:User{username:\'a\'})-[r]->(bid:Bid) return bid.bidname,type(r)";	 		
		console.log(querystring);
		var query=[querystring].join('\n');
		db.query(query, params, function(err, results){
			if(err){			
				callback(err.messages);
			}		
			else if(results){	
				callback(results);
			}
		});
	}
}

