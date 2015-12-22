angular.module("urbanYogaApp")

.controller("programsCtrl", function($scope, $http) {
    
    $scope.programsData = {};
    $scope.pricingOptions = {};

    $scope.programsData.dataLoading = true;
    $scope.pricingOptions.dataLoading = true;

    $http.get('https://api.myjson.com/bins/5bdb3').then(function(response){
    	$scope.programs = response.data;
    }).finally(function () {
    	$scope.programsData.dataLoading = false;
	});

    $http.get('https://api.myjson.com/bins/17oy7').then(function(response){
    	$scope.pricingOptions = response.data;
    }).finally(function () {
    	$scope.pricingOptions.dataLoading = false;
	});
});