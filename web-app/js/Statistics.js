var Statistics = {
		
	init: function() {
		var self = this;
		var $statistics = $("#statistics");
		
		self.createResourcesChart();
		
		$("#statistics-button").button().click(function() {
			$statistics.dialog("open");
		});
		
		$statistics.dialog({
			modal: true,
			height: 500,
			width: 500,
			autoOpen: false,
		});		
	},
	
	createResourcesChart: function() {
		var self = this;
		
		nv.addGraph(function() {
			var chart = nv.models.lineChart();
			
			chart.xAxis
				.axisLabel("Test X")
				.tickFormat(d3.format(',r'));
			
			chart.yAxis
				.axisLabel("Test Y")
				.tickFormat(d3.format('.02f'));
			
			d3.select("#resource-history svg")
				.datum(self.sinAndCos())
				.transition().duration(500)
				.call(chart);
			
			nv.utils.windowResize(function() {
				d3.select("#resource-history svg").call(chart);
			});
			
			return chart;
		});
	},
	
	sinAndCos: function() {
		   var sin = [],
		   cos = [];
		    
		   for (var i = 0; i < 100; i++) {
			   sin.push({x: i, y: Math.sin(i/10)});
			   cos.push({x: i, y: .5 * Math.cos(i/10)});
		   }
		    
		   return [
		   {
			   values: sin,
			   key: 'Sine Wave',
			   color: '#ff7f0e'
		   },
		   {
			   values: cos,
			   key: 'Cosine Wave',
			   color: '#2ca02c'
		   }
		   ];
	}
}