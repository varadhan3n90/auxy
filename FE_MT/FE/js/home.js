(function(){
var app = angular.module("bidding",[]);

MainController = function($scope, $http){
$http.defaults.useXDomain = true;

	//SignupUser
	$scope.SignupUserByEmail = function(Email, password1){			
		var str = [];		
		var str1 = 'username='+Email+'&password'+'='+password1;
		
		$http({
			method: 'POST',
			url: 'http://localhost:3000/SignupUser',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},			
			data: $.param({username: Email, password:password1})
		}).then(onSignupComplete, onSignupError);
		
	}
	var onSignupComplete = function(response){
		console.log(response.data.msg);
		document.getElementById('errormsgs').innerHTML=response.data.msg;
		document.getElementById('errormsgs').style.backgroundColor=response.data.color;				
		document.getElementById('errormsgs').style.visibility="visible";
		
	}	
	var onSignupError = function(errormsg){
				
	}
	
	//SigninUser
	$scope.SigninUserByEmail = function(username, password){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/SigninUser',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},			
			data: $.param({username: username, password:password})
		}).then(onSigninComplete, onSigninError);
	}
	var onSigninComplete = function(response){	
		console.log(response);
	}	
	var onSigninError = function(errormsg){
		console.log(errormsg);		
	}
	
	
}

//app.Controller("MainController", MainController);
}());