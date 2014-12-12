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

var db = new neo4j.GraphDatabase('http://localhost:7474');

var app = express();
app.use(session({secret:'secret', resave:true, saveUninitialized:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

var params={}
var sess;

exports.ex_SigninUser = function(request, response){
	console.log('body: '+request.body.username);	
	var username = request.param('username');
	var password = request.param('password');
	sess = request.session;
	sess.username = username;

	var querystring = 'MATCH (user:User { username:\''+username+'\', password:\''+password+'\' }) return user.username, user.password, user.IsAdmin;';
	var query=[querystring].join('\n');
	
	db.query(query, params, function(err, results){
		if(err){		
			console.log(err);
			response.send('Sorry our db is down.. Please contact administrator..');			
		}		
		else if(results.length!=0){
			sess.username = results[0]["user.username"];
			console.log(results);
			if(results[0]["user.username"] && results[0]["user.IsAdmin"]==true){
				response.redirect("/admindash");
			}else if(results[0]["user.username"] && results[0]["user.IsAdmin"]==false){
				request.session.regenerate(function(){
					request.session.user = results[0]["user.username"];
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
