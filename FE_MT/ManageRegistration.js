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

exports.ex_ManageRegistration = function(request, response, callback){
	var bidname = request.param('bidname');
	console.log(bidname);
	var session = request.session;
	console.log("hi user: "+session.username);
	if((bidname!=undefined)){
		var querystring = "MATCH (user)-[register:Register]->(bid:Bid{bidname:\'"+bidname+"\'}) return user.username";	 
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


exports.ex_ApproveRegistration = function(request, response, callback){
	var bidname = request.param('bidname');
	var userlist = request.param('userlist');
	console.log('bidname:'+bidname);
	console.log('userlist:'+userlist);
	var usernames = userlist.split(" ");
	if((bidname!=undefined)&&(userlist!="")){
		var matchparam="";
		for(var i=0;i<usernames.length;i++){
			 matchparam = matchparam + "\'"+usernames[i]+"',";
			 
		}	
		matchparam = matchparam.substr(0, matchparam.length-1);
		console.log(matchparam);
	
		var querystring = "MATCH (user:User)-[r]->(bid:Bid{bidname:\'"+bidname+"\'}) WHERE user.username IN ["+matchparam+"] delete r CREATE (user)-[registered:Registered]->(bid) return user,bid";	 
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
