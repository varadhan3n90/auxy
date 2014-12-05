var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var express = require('express');
var bodyParser = require('body-parser');

var SignupUser = require('./SignupUser');
var SigninUser = require('./SigninUser');
var AdminAddBid = require('./AdminAddBid');
var AdminViewBid = require('./AdminViewBid');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);
console.log('Watching...');

var output;

app.post('/SignupUser', function(req, res) {
	console.log('SignupUser');
	output = SignupUser.ex_SignupUser(req, res);
	res.send(output);	
});

app.post('/SigninUser', function(req, res) {
	console.log('SigninUser');
	output = SignupUser.ex_SigninUser(req, res);
	res.send(output);	
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