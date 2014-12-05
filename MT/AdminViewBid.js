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
var output;

function ViewBid(bid, noofitems){	
	//bid object {biddingName, startTime, endTime, item {name, detail, price}}		
	var querystring = 'MATCH (bid:Bid) return bid;';	 
	console.log(querystring);
	var query=[querystring].join('\n');
	db.query(query, params, function(err, results){
		if(err){			
			output = err.message;
		}		
		else if(results){	
			var res1 = results;	
			//console.log('-----');
			//console.log(JSON.parse(res1).bid);
			output = results;
		}
	});
}

exports.ex_AdminViewBid = function(request, response){
	ViewBid();		
	return output;		
}

