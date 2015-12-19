
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
						 previousYear = attrs.previousyear || 10,
					    currentYear = attrs.currentyear || 10;

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
	            			      return chartHeight - yScale(previousYear) - 25;  //Height minus data value
	            			  });

	            var bar2 = svgCanvas.append('rect')
	            			  .style("fill", "#B7D7BA")
	            			  .attr("width", 5)
	            			  .attr("height", 0)
	            			  .attr('x', 0)
	            			  .attr("y", function() {
	            			      return chartHeight - yScale(currentYear) - 25;  //Height minus data value
	            			  });
	            			  

	            bar1.transition()
          				 .duration(1000)
          				 .attr('height', function(d) {
    				             return yScale(previousYear);
    				           });
					    	 // .attr('height', previousYear);

					bar2.transition()
          				 .duration(1000)
					    	 .attr('height', function(d) {
    				             return yScale(currentYear);
    				           });
					
					// var bar2 = svgCanvas.selectAll('rect')
					//           .data(scope.data)
					//           .enter()
					//           .append('rect')
					//           .style("fill", "steelblue")
					//           .attr('height', 0);
					
					//     bar.transition()
     //      				 .duration(1000)
					//     	 .attr('width', y)
					//        .attr('height', previousYear)
					//        .attr("y", 50)
					//        .attr("x", 30);
					       
							 

					 
				});
			}
		};
	}])
	
	.controller("programsCtrl", function($scope, $http) {
		$http.get('https://api.myjson.com/bins/5bdb3').then(function(response){
    		$scope.programs = response.data;
		});
		$http.get('https://api.myjson.com/bins/17oy7').then(function(response){
    		$scope.pricingOptions = response.data;
		});
	});


})();