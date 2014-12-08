(function(){
var bidding_Userdashboard = angular.module("bidding_Userdashboard",[]);

UserDashboardController = function($scope, $http){
	$http.defaults.useXDomain = true;	
	console.log('viewbid');
	//AddBid
	$scope.ViewBid = function(bid, count){		
		console.log('ViewBid');
		$http({
			method: 'GET',
			url: 'http://localhost:3000/UserViewBid',			
		}).then(onUserBidComplete, onUserBidError);
		
		var onUserBidComplete = function(response){			
			console.log(JSON.parse(response));
		}	
		var onUserBidError = function(errormsg){		
			console.log(errormsg);		
		}			
	}
		
}
//bidding_Admindashboard.Controller("AdminDashboardController", AdminDashboardController);
}());