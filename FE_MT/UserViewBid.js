var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var express = require('express');
var neo4j = require('neo4j');
var bodyParser = require('body-parser');
var json = require('json');

var db = new neo4j.GraphDatabase('http://localhost:7474');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

var params={}

exports.ex_UserViewBid = function(request, response, callback){	
	var querystring = 'MATCH (bid:Bid)-[has:Has]->(item:Item) return bid.bidname, bid.starttime, bid.endtime, item.itemname, item.itemdetail, item.itemprice;';	 
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

