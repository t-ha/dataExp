// // var request = require('request');
// var request;
// function(require) {
// 	request = require('request');
// }
$(function() {
	var request = require('request');
	var xScale, yScale, currentData;

		// Track the sex (male, female) and drinking type (any, binge) in variables
		var place = 'all';
		var playerID = 201939;
		var url = 'http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&'
		+'LastNGames=0&TeamID=0&Position=&Location=&Outcome=&ContextMeasure=FGA&DateFrom=&'
		+'StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=2014-15&AheadBehind=&'
		+'PlayerID='+playerID+'&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&'
		+'StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID='

		var cData;

		request(url, function(err, res, body) {
			var player = JSON.parse(body);
			cData = player.resultSets[0].rowSet;

			// var x = [];
			// var y = [];
			// cData.forEach(function(d) {
			// 	x.push(d[d.length - 4]);
			// 	y.push(d[d.length - 3]);
			// });
		});

		// Margin: how much space to put in the SVG for axes/titles
		var margin = {
			left:0,
			bottom:0,
			top:0,
			right:0,
		};

		// Height/width of the drawing area for data symbols
		var height = 600 - margin.bottom - margin.top;
		var width = 600 - margin.left - margin.right;

	 	// Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
		var svg = d3.select('#chart')
			.append('svg')
			.attr('height', 600)
			.attr('width', 600);

		// Append a 'g' element in which to place the rects, shifted down and right from the top left corner
		var g = svg.append('g')
				.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
				.attr('height', height)
				.attr('width', width);

		// Append an xaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
		// var xAxisLabel = svg.append('g')
		// 										.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
		// 										.attr('class', 'axis')

		// // Append a yaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
		// var yAxisLabel = svg.append('g')
		// 								.attr('class', 'axis')
		// 								.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

		// // Append text to label the y axis (don't specify the text yet)
		// var xAxisText = svg.append('text')
		// 									 .attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
		// 									 .attr('class', 'title')

		// // Append text to label the y axis (don't specify the text yet)
		// var yAxisText = svg.append('text')
		// 									 .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
		// 									 .attr('class', 'title')

		// Write a function for setting scales.
		// var setScales = function(data) {
		// 	// Get the unique values of states for the domain of your x scale
		// 	var states = data.map(function(d) {return d.state});

		// 	// Define an ordinal xScale using rangeBands
		// 	xScale  = d3.scale.ordinal().rangeBands([0, width], .2).domain(states);

		// 	// Get min/max values of the percent data
		// 	var yMin =d3.min(data, function(d){return +d.percent});
		// 	var yMax =d3.max(data, function(d){return +d.percent});

		// 	// Define the yScale: remember to draw from top to bottom!
		// 	yScale = d3.scale.linear().range([height, 0]).domain([0, yMax]);
		// }

		// Function for setting axes
		// var setAxes = function() {
		// 	// Define x axis using d3.svg.axis(), assigning the scale as the xScale
		// 	// var xAxis = d3.svg.axis()
		// 	// 			.scale(xScale)
		// 	// 			.orient('bottom')

		// 	// // Define y axis using d3.svg.axis(), assigning the scale as the yScale
		// 	// var yAxis = d3.svg.axis()
		// 	// 			.scale(yScale)
		// 	// 			.orient('left')
		// 	// 			.tickFormat(d3.format('.2s'));

		// 	// // Call xAxis
		// 	// xAxisLabel.transition().duration(1500).call(xAxis);

		// 	// // Call yAxis
		// 	// yAxisLabel.transition().duration(1500).call(yAxis);

		// 	// Update labels
		// 	xAxisText.text('Feet from basket');
		// 	yAxisText.text('Feet from bakset');
		// }

		// Write a function to filter down the data to the current sex and type
		// var filterData = function() {
		// 	currentData = allData.filter(function(d) {
		// 		return d.type == type && d.sex == sex
		// 	}		
		// }

		// Store the data-join in a function: make sure to set the scales and update the axes in your function.
		var draw = function(data) {
			// Set scales
			// setScales(data);

			// Set axes
			// setAxes();

			var circles = g.selectAll('circle').data(data);

			// // Use the .enter() method to get your entering elements, and assign initial positions
			circles.enter().append('circle')
				.attr('r', 20)
				.attr('cy', function(d){return (d[d.length - 4] + 300)})
				.attr('cy', function(d){return (d[d.length - 3] + 40)})
				.style('fill', 'blue');
			// 	.attr('height', 0)
			// 	.attr('width', xScale.rangeBand())
			// 	.attr('class', 'bar')
			// 	.attr('title', function(d) {return d.state_name});

			// // Use the .exit() and .remove() methods to remove elements that are no longer in the data
			circles.exit().remove();

			// // Transition properties of the update selection
			// bars.transition()
			// 	.duration(1500)
			// 	.delay(function(d,i){return i*50})
			// 	.attr('x', function(d){return xScale(d.state)})
			// 	.attr('y', function(d){return yScale(d.percent)})
			// 	.attr('height', function(d) {return height - yScale(d.percent)})
			// 	.attr('width', xScale.rangeBand())
			// 	.attr('title', function(d) {return d.state_name});
		}

		// Assign a change event to input elements to set the sex/type values, then filter and update the data
		// $("input").on('change', function() {
		// 	// Get value, determine if it is the sex or type controller
		// 	var val = $(this).val();
		// 	var isSex = $(this).hasClass('sex');
		// 	if(isSex) sex = val;
		// 	else type = val;

		// 	// Filter data, update chart
		// 	filterData();
		// 	draw(currentData);
		// });

		// Filter data to the current settings then draw
		// filterData()
		draw(currentData)
});