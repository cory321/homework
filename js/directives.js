angular.module("urbanYogaApp")

.directive('d3Bars', ['d3Service', function(d3Service){
	
	return {
		restrict: 'EA',
		scope: {},
		
		link: function(scope, ele, attrs){

		d3Service.d3().then(function(d3) {
			
			var month = attrs.month || "Month",
				previousYear = Math.floor(attrs.previousyear * 0.001) || 10,
				currentYear = Math.floor(attrs.currentyear * 0.001) || 10;

			var canvasWidth = 25,
				canvasHeight = 110;

			var yScale = d3.scale.linear()
						.domain([0, 100])
						.range([0, canvasHeight]);

			var canvas = d3.select(ele[0])
						.append('svg')
						.style('width', canvasWidth)
						.style('height', canvasHeight);

        		canvas.append("text")
						.text(month)
						.attr("x", 0)
						.attr("y", 100)
						.attr("font-family", "sans-serif")
						.attr("font-size", "14px")
						.attr("fill", "#A0A092");
      
            var bar1 = canvas.append('rect')
	    			  	.style("fill", "#CCBDDC")
						.attr("width", 5)
						.attr("height", 0)
						.attr('x', 8)
						.attr("y", function(d) {
							return canvasHeight - yScale(previousYear) - 25; 
						});

            var bar2 = canvas.append('rect')
						.style("fill", "#B7D7BA")
						.attr("width", 5)
						.attr("height", 0)
						.attr('x', 0)
						.attr("y", function() {
							return canvasHeight - yScale(currentYear) - 25;  
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
}]);