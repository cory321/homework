angular.module("urbanYogaApp")

.controller("programsCtrl", function($scope, $http) {
    $http.get('https://api.myjson.com/bins/5bdb3').then(function(response){
    	$scope.programs = response.data;
    });

    $http.get('https://api.myjson.com/bins/17oy7').then(function(response){
    	$scope.pricingOptions = response.data;
    });
});