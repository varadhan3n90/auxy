var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

var SignupUser = require('./SignupUser');
var SigninUser = require('./SigninUser');
var AdminAddBid = require('./AdminAddBid');
var AdminViewBid = require('./AdminViewBid');

var app = express();
// For all Front end
app.use(express.static('FE'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);
app.use(session({secret:'secret', resave:true, 
				saveUninitialized: true, 
				}));
console.log('Watching...');

var output;

app.get('/', function(req, res){
	console.log('Root');
	res.sendFile(__dirname + '/FE/home.html');
});

app.get('/userdash', function(req, res){
	console.log('UserDash');
	console.log(req.session.user);
	res.sendFile(__dirname + '/FE/user_dashboard.html');
});


app.post('/SignupUser', function(req, res) {
	console.log('SignupUser');
	SignupUser.ex_SignupUser(req, res, function(output){
		console.log(output);
		res.send(output);		
	});		
});


app.post('/SigninUser', function(req, res) {
	console.log('SigninUser');
	SigninUser.ex_SigninUser(req, res);	
});

app.post('/AdminAddBid', function(req, res) {
	console.log('AdminAddBid');
	output = AdminAddBid.ex_AdminAddBid(req, res);
	res.send(output);	
});

app.get('/AdminViewBid', function(req, res){
	console.log('AdminViewBid');
	output = AdminViewBid.ex_AdminViewBid(req, res);
	res.send(output);
});

app.listen(3000);