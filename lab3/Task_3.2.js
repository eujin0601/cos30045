function init() {

// ***Variable declarations***
	var w = 500;
	var h = 200;
	var padding = 10;
	var dataset=[ 
				[5, 20], 
				[500, 90], 
				[250, 50], 
				[100, 33], 
				[330, 95], 
				[410, 12], 
				[475, 44], 
				[25, 67], 
				[85, 21], 
				[220, 88] 
				];
	var xScale = d3.scaleLinear()
				.domain([d3.min(dataset, function(d) {
					return d[0]-30;
				}),
				d3.max(dataset, function(d) {
				return d[0]+50;
				})])
				.range([padding, w - padding]);
				
	var yScale = d3.scaleLinear()
				.domain([d3.min(dataset, function(d) {
					return d[1]-30;
				}),
				d3.max(dataset, function(d) {
				return d[1]+50;
				})])
				.range([h - padding, padding]);
				
	var max=d3.max(dataset, function(d){
		return d[0]
	});
	
	var xAxis=d3.axisBottom()
                    .ticks(5)
                    .scale(xScale);

    var yAxis=d3.axisLeft()
					.ticks(5)
                    .scale(yScale);
				
	var svg = d3.select("#chart") //Reference the id of the HTML element
				.append("svg")
				.attr("width",w)
				.attr("height",h);
	// ***Variable declarations***

	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d,i){
			return xScale(d[0]);
			})
		.attr("cy", function(d){
			return yScale(d[1]);
			})
		.attr("r", function(d) {
			return 5;
			})
		.attr("fill", "slategrey")
		.style("fill",function(d,i){
			if(d[0]==max){
				return "red";
			}
		});

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x",(item)=>{
			return xScale(item[0]+5)
		})
		.attr("y",(item)=>{
			return yScale(item[1])
		})
		.text((item)=>{
			return item[0]+", "+item[1]
		})
		.attr("fill", "green");
		
	svg.append("g")
            .attr("transform", "translate(0," + (h-padding-10) + ")")
            .call(xAxis);

    svg.append("g")
            .attr("transform", "translate (" + (padding+20) + ", 0)")
            .call(yAxis);
}

window.onload = init;