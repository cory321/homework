angular.module("urbanYogaApp")

.directive('d3Bars', ['d3Service', function(d3Service){
	
	return {
		restrict: 'EA',
		scope: {
            value: "="
        },
		link: function(scope, ele, attrs){

		d3Service.d3().then(function(d3) {
			
			var months = "Jan Feb Mar Apr May Jun Jul";

			var previousYear = JSON.parse(attrs.previousyear);
			var currentYear = JSON.parse(attrs.currentyear);

			var dataToBarSize = function(d) {
				return Math.floor(d * 0.001 * 1.5);
			};

			var canvasWidth = 200,
				canvasHeight = 100;

			var canvas = d3.select(ele[0])
						.append('svg')
						.style('width', canvasWidth)
						.style('height', canvasHeight);

        		canvas.append("text")
						.text(months)
						.attr("x", 0)
						.attr("y", 95)
						.attr("font-family", "sans-serif")
						.attr("font-size", "14px")
						.attr("fill", "#A0A092");

			var purpleBar = canvas.selectAll(".purpleBar")
					   .data(previousYear)
					   .enter()
					   .append("rect")
					   .attr("class", "purpleBar")
					   .attr("x", function(d, i) {
					       return i * 28;
					   })
					   .attr("y", function(d) {
					       return canvasHeight - 20;
					   })
					   .attr("width", 6)
					   .attr("height", function(d) {
					       return dataToBarSize(d) - dataToBarSize(d);
					   })
					   .style("fill", "#CCBDDC");

			var greenBar = canvas.selectAll(".greenBar")
					   .data(currentYear)
					   .enter()
					   .append("rect")
					   .attr("class", "greenBar")
					   .attr("x", function(d, i) {
					       return i * 28 + 8;
					   })
					   .attr("y", function(d) {
					       return canvasHeight - 20;
					   })
					   .attr("width", 6)
					   .attr("height", function(d) {
					       return dataToBarSize(d) - dataToBarSize(d);
					   })
					   .style("fill", "#B7D7BA");
    
            		purpleBar.transition()
						.duration(1000)
					  	.attr("y", function(d) {
							return canvasHeight - dataToBarSize(d) - 20;
					    })
						.attr("height", function(d) {
						       return dataToBarSize(d);
						});

					greenBar.transition()
						.duration(1000)
						.attr("y", function(d) {
							return canvasHeight - dataToBarSize(d) - 20;
					    })
						.attr("height", function(d) {
						       return dataToBarSize(d);
						});
			});
		}
	};
}]);