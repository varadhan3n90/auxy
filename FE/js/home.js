(function(){
var app = angular.module("bidding",[]);

MainController = function($scope, $http){
$http.defaults.useXDomain = true;

	//SignupUser
	$scope.SignupUserByEmail = function(Email, password1){			
		var str = [];
		document.getElementById('errormsgs').style.visibility="hidden";
		document.getElementById('errormsgs').innerHTML="";
		var str1 = 'username='+Email+'&password'+'='+password1;
		
		$http({
			method: 'POST',
			url: 'http://localhost:3000/SignupUser',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},			
			data: $.param({username: Email, password:password1})
		}).then(onSignupComplete, onSignupError);
		
	}
	var onSignupComplete = function(response){
		console.log(response.data);
		if(response.data.length==0){
			document.getElementById('errormsgs').style.visibility="hidden";
			document.getElementById('errormsgs').innerHTML="";
		}
		if(response.data.toString().indexOf('already exists')){
			document.getElementById('errormsgs').style.visibility="visible";
			document.getElementById('errormsgs').innerHTML="Username already exists";			
		}
	}	
	var onSignupError = function(errormsg){
				
	}
	
	//SigninUser
	$scope.SigninUserByEmail = function(username, password){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/SigninUser',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},			
			data: $.param({username: Email, password:password1})
		}).then(onSigninComplete, onSigninError);
	}
	var onSigninComplete = function(response){	
		
	}	
	var onSigninError = function(errormsg){
				
	}
	
	
}

//app.Controller("MainController", MainController);
}());