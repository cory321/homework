
(function(){

	angular.module('d3', [])

	.factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();

      function onScriptLoad() {
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }

      var scriptTag = $document[0].createElement('script');
      
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      };
      scriptTag.onload = onScriptLoad;
 
      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
 
      return {
        d3: function() { return d.promise; }
      };
	}]);

	
	angular.module("urbanYogaApp", ['d3'])

	.directive('d3Bars', ['d3Service', function(d3Service){
		return {
			restrict: 'EA',
			scope: {},
			link: function(scope, ele, attrs){

				d3Service.d3().then(function(d3) {
					var month = attrs.month || "Month",
						 previousYear = Math.floor(attrs.previousyear * 0.001) || 10,
					    currentYear = Math.floor(attrs.currentyear * 0.001) || 10;

				   var chartWidth = 25;
				   var chartHeight = 110;

				   var yScale = d3.scale.linear()
	               .domain([0, 100])
	               .range([0, chartHeight]);

					var svgCanvas = d3.select(ele[0])
					  				.append('svg')
					            .style('width', chartWidth)
					            .style('height', chartHeight);

	            svgCanvas.append("text")
	            .text(month)
	            .attr("x", 0)
	            .attr("y", 100)
	            .attr("font-family", "sans-serif")
	            .attr("font-size", "14px")
	            .attr("fill", "#A0A092");
	      
	            var bar1 = svgCanvas.append('rect')
	            			  .style("fill", "#CCBDDC")
	            			  .attr("width", 5)
	            			  .attr("height", 0)
	            			  .attr('x', 8)
	            			  .attr("y", function(d) {
	            			      return chartHeight - yScale(previousYear) - 25; 
	            			  });

	            var bar2 = svgCanvas.append('rect')
	            			  .style("fill", "#B7D7BA")
	            			  .attr("width", 5)
	            			  .attr("height", 0)
	            			  .attr('x', 0)
	            			  .attr("y", function() {
	            			      return chartHeight - yScale(currentYear) - 25;  
	            			  });
	            			  

	            bar1.transition()
          				 .duration(1000)
          				 .attr('height', function(d) {
    				             return yScale(previousYear);
    				           });

					bar2.transition()
          				 .duration(1000)
					    	 .attr('height', function(d) {
    				             return yScale(currentYear);
    				           });
				});
			}
		};
	}])
	
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


})();