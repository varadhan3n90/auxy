(function(){
var bidding_Admindashboard = angular.module("bidding_Admindashboard",[]);

AdminDashboardController = function($scope, $http){
	$http.defaults.useXDomain = true;	
	
	//AddBid
	$scope.AddBid = function(bid, count){			
		$http({
			method: 'GET',
			url: 'http://localhost:3000/UserBid',			
		}).then(onUserBidComplete, onUserBidError);
		
		var onUserBidComplete = function(response){
			console.log(response);
		}	
		var onUserBidError = function(errormsg){
			console.log(errormsg);		
		}			
	}
		
}
//bidding_Admindashboard.Controller("AdminDashboardController", AdminDashboardController);
}());