angular.module("urbanYogaApp")

.controller("programsCtrl", function($scope, $http) {
    
    $scope.pData = {};
    $scope.poData = {};

    $scope.pData.dataLoading = true;
    $scope.poData.dataLoading = true;

    $http.get('https://api.myjson.com/bins/5bdb3').then(function(response){
    	$scope.programs = response.data;
    }).finally(function () {
    	$scope.pData.dataLoading = false;
	});

    $http.get('https://api.myjson.com/bins/17oy7').then(function(response){
    	$scope.pricingOptions = response.data;
    }).finally(function () {
    	$scope.poData.dataLoading = false;
	});
});