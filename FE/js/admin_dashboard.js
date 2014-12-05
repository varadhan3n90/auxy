(function(){
var bidding_Admindashboard = angular.module("bidding_Admindashboard",[]);

AdminDashboardController = function($scope, $http){
	$http.defaults.useXDomain = true;	
	
	//AddBid
	$scope.AddBid = function(bid, count){			
		$http({
			method: 'POST',
			url: 'http://localhost:3000/AdminAddBid',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},			
			data: $.param({bid: bid, noofitems: count})
		}).then(onAddBidComplete, onAddBidError);
		
		var onAddBidComplete = function(response){
			console.log(response);
		}	
		var onAddBidError = function(errormsg){
			console.log(errormsg);		
		}			
	}
		
}
//bidding_Admindashboard.Controller("AdminDashboardController", AdminDashboardController);
}());