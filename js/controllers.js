angular.module("urbanYogaApp")

.controller("programsCtrl", function($scope, $http) {
    $http.get('https://api.myjson.com/bins/5bdb3').then(function(response){
    	$scope.programs = response.data;

        
    	
        var monthsArray = [];

    	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    	var curYear, prevYear;

    	for(j = 0; j < response.data.length; j++) {
    		currYear = $scope.programs[j].Sales.CurrentYear;
    		prevYear = $scope.programs[j].Sales.PreviousYear;

    		for (i = 0; i < currYear.length; i++){
    			// console.log(currYear[i]);
    				monthsArray.push({
    					month: monthNames[i],
    					previousYear: prevYear[i],
    					currentYear: currYear[i]
    			});
    		}
    		// // currMonth = monthNames[];
    		// console.log(program);
    		// console.log(prevYear+ " and " + currYear);
    	}
    	$scope.months = monthsArray;
    });

    $http.get('https://api.myjson.com/bins/17oy7').then(function(response){
    	$scope.pricingOptions = response.data;
    });
});