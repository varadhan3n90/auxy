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

exports.ex_SigninUser = function(request, response){
	console.log('body: '+request.body.username);
	var username = request.param('username');
	var password = request.param('password');

	var querystring = 'MATCH (user:User { username:\''+username+'\', password:\''+password+'\' }) return user;';
	console.log(querystring);
	var query=[querystring].join('\n');
	
	db.query(query, params, function(err, results){
		if(err){			
			response.send('Sorry our db is down.. Please contact administrator..');			
		}		
		else if(results.length!=0){
			//console.log(JSON.stringify(results));
			if(results[0].user.data._data.isAdmin){
				response.redirect("/admindash");
			}else{
				request.session.regenerate(function(){
					request.session.user = results;
					request.session.success = 'success';
				});		
				response.redirect("/userdash");
			}
		}else{
			request.session.error = 'invalid login';
			response.redirect('/?login=fail');
		}
	});
	
	
}
