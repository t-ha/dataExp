$(function() {

	d3.csv('data/shots.csv', function(error, allData) {
		var cData = allData;
		var pID = 977;
		var quarter = 1000;
		var colors = ['yellow', 'red'];

		var margin = {
			left:25,
			bottom:20,
			top:25,
			right:25,
		};

		var height = 640 - margin.bottom - margin.top;
		var width = 550 - margin.left - margin.right;

		var svg = d3.select('#chart')
			.append('svg')
			.attr('height', 660)
			.attr('width', 550);

		var g = svg.append('g')
				.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
				.attr('height', height)
				.attr('width', width);

		// filter data based on input
		var filterData = function() {
			cData = allData.filter(function(d) {
				return +d.PLAYER_ID == pID && (+d.PERIOD == quarter || (+d.PERIOD * 100) < quarter)
			});
		}

		// draw the basketball court (half)
		var drawCourt = function() {
			var arc = d3.svg.arc()
						.innerRadius(60)
						.outerRadius(62)
						.startAngle(1/2*Math.PI)
						.endAngle(3/2*Math.PI);
			var hoop = d3.svg.arc()
						.innerRadius(40)
						.outerRadius(42)
						.startAngle(1/2*Math.PI)
						.endAngle(-1/2*Math.PI);

			g.append('rect')		// baseline
				.attr('x', 0)
				.attr('y', height)
				.attr('width', width)
				.attr('height', 2);
			g.append('rect')		// left long 14ft
				.attr('x', 30)
				.attr('y', height - 140)
				.attr('width', 2)
				.attr('height', 140);
			g.append('rect')		// left sideline
				.attr('x', 0)
				.attr('y', height - 430)
				.attr('width', 2)
				.attr('height', 430);	
			g.append('rect')		// right long 14ft
				.attr('x', width - 32)
				.attr('y', height - 140)
				.attr('width', 2)
				.attr('height', 140)
			g.append('rect')		// right sideline
				.attr('x', width - 2)
				.attr('y', height - 430)
				.attr('width', 2)
				.attr('height', 430)
			g.append('rect')		// half court
				.attr('x', 0)
				.attr('y', height - 430)
				.attr('width', width)
				.attr('height', 2)
			g.append('rect')		// paint left out
				.attr('x', 170)
				.attr('y', height - 190)
				.attr('width', 2)
				.attr('height', 190)
			g.append('rect')		// paint left in
				.attr('x', 189)
				.attr('y', height - 190)
				.attr('width', 2)
				.attr('height', 190)
			g.append('rect')		// paint right out
				.attr('x', 328)
				.attr('y', height - 190)
				.attr('width', 2)
				.attr('height', 190)
			g.append('rect')		// paint right in
				.attr('x', 309)
				.attr('y', height - 190)
				.attr('width', 2)
				.attr('height', 190)
			g.append('rect')		// paint top
				.attr('x', 170)
				.attr('y', height - 190)
				.attr('width', 160)
				.attr('height', 2)
			g.append('rect')		// basket backboard
				.attr('x', 220)
				.attr('y', height - 40)
				.attr('width', 60)
				.attr('height', 2)
			g.append('circle')		// basket rim
				.attr('r', 9)
				.attr('cx', width/2)
				.attr('cy', height - 49)
				.attr('fill', 'transparent')
				.attr('stroke', 'black')
				.attr('stroke-width', 2);
			g.append('path')		// basket restricted
				.attr('class', 'arc')
				.attr('d', hoop)
				.attr('transform', 'translate(' +  width/2 + ',' + (height - 40) + ')')
			g.append('circle')		// circle
				.attr('r', 60)
				.attr('cx', width/2)
				.attr('cy', height - 190)
				.attr('fill', 'transparent')
				.attr('stroke', 'black')
				.attr('stroke-width', 2);
			g.append('path')		// 3pt arc
				.attr('class', 'path')
				.attr('d', 'M 30 458 Q 250 180 470 458')
				.attr('fill', 'transparent')
				.attr('stroke', 'black')
				.attr('stroke-width', 2);
			g.append('path')		// half court circle
				.attr('class', 'arc')
				.attr('d', arc)
				.attr('transform', 'translate(' +  width/2 + ',' + (height - 430) + ')')
		}

		// draw legeng (shot made/missed)
		var drawLegend = function() {
			g.append('rect')
				.attr('x', 390)
				.attr('y', 10)
				.attr('width', 110)
				.attr('height', 40)
				.attr('fill', 'transparent')
				.attr('stroke', 'black');
			g.append('circle')
				.attr('r', 6)
				.attr('cx', 402)
				.attr('cy', 20)
				.attr('fill', d3.rgb(243,38,19));
			g.append('circle')
				.attr('r', 6)
				.attr('cx', 402)
				.attr('cy', 38)
				.attr('fill', d3.rgb(247,202,24));
			g.append('text')
				.attr('x', 416)
				.attr('y', 25)
				.text('Shot made');
			g.append('text')
				.attr('x', 416)
				.attr('y', 43)
				.text('Shot missed');
			g.append('text')
				.attr('x', 394)
				.attr('y', 64)
				.text('Tooltip:');
			g.append('text')
				.attr('x', 394)
				.attr('y', 79)
				.text('Feet from basket');
		}

		// draw the shots
		var draw = function(data) {
			var circles = g.selectAll('circle').data(data);
			circles.enter().append('circle')
				.attr('r', 6)
				.attr('cx', function(d){return (+d.LOC_X + width/2)})
				.attr('cy', function(d){return (height - +d.LOC_Y - 40)})
				.attr('class', 'shots')
				.style('opacity', 0.6)
				.attr('fill', function(d){return (+d.SHOT_MADE_FLAG == 1 ? d3.rgb(243,38,19) : d3.rgb(247,202,24));})
				.attr('title', function(d) {return d.SHOT_DISTANCE});

			circles.exit().remove();
		}


		// filter data, draw the shots, re-apply tooltip
		var drawFull = function() {
			filterData();
			draw(cData);

			$('circle').tooltip({
				'container': 'body',
				'placement': 'top'
			});
		}

		// filter/redraw on input change
		$("input").on('change', function() {
			var val = +$(this).val(); // new value
			var playerID = $(this).hasClass('player'); // did the user change player?
			if(playerID) {	// if so set the value to new pID
				pID = val;
			} else {		// set value to quarter
				quarter = val;
			}

			g.selectAll('.shots').remove(); // remove all the shots before redrawing
			drawFull();
		});

		drawLegend();
		drawCourt();
		drawFull();
	});
});