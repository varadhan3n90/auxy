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

function CreateBid(bid, noofitems){	
	//bid object {biddingName, startTime, endTime, item {name, detail, price}}		
	var querystring = 'CREATE (bid:Bid { bidname:\''+bid.biddingName+'\', starttime:\''+bid.startTime+'\', endtime:\''+bid.endTime+'\'})';
	for(var i=0;i<noofitems;i++){
	 querystring=querystring+',(item'+i+':Item { itemname:\''+bid.items[i].name+'\', itemdetail:\''+bid.items[i].detail+'\', itemprice:\''+bid.items[i].price+'\'})';
	 querystring=querystring+',(bid)-[:Has]->(item'+i+')';
	}
	 
	console.log(querystring);
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

exports.ex_AdminAddBid = function(request, response){
	var bid = request.param('bid');
	var noofitems = request.param('noofitems');
	CreateBid(bid, noofitems);	
	output=1;
	return output;		
}

