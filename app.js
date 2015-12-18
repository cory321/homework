
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
				scope.data = [1, 2, 3, 4, 5];

				d3Service.d3().then(function(d3) {
					var margin = parseInt(attrs.margin) || 20,
					          barHeight = parseInt(attrs.barHeight) || 20;

					var height = 80;

					var y = d3.scale.linear()
					    .domain([0, d3.max(scope.data)])
					    .range([0, height]);

					var svg = d3.select(ele[0])
					  				.append('svg')
					            .style('width', '100%')
					            .style('height', '200');

	            svg.append("text")
	            .text("Jan Feb Mar Apr May Jun Jul")
	            .attr("y", 100)
	            .attr("font-family", "sans-serif")
	            .attr("font-size", "18px")
	            .attr("fill", "red");
					
					var bar = svg.selectAll('rect')
					          .data(scope.data)
					          .enter()
					          .append('rect')
					          .style("fill", "steelblue")
					          .attr('width', 0);
					
					    bar.transition()
          				 .duration(1000)
					    	 .attr('width', y)
					       .attr('height', barHeight)
					       .attr("y", function(d) { return y(d)-3; })
					       .attr("x", barHeight / 2);
					       
							 

					 
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