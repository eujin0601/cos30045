function init(){
    var w = 500;
	var h = 100;

		d3.csv("Task_2.4_data.csv").then(function(data){
		console.log(data);
		wombatSightings=data;
			//Calling the function
			barChart(wombatSightings);
        barChartLabel(wombatSightings);
			
		});
	
	var barPadding=5;
	
	var svg1 = d3.select("#chart")	//Reference the id of the HTML element
				.append("svg")
				.attr("width",w)
				.attr("height",h);
					
	var svg2 = d3.select("#label")
                .append("svg")
				.attr("width",w)
				.attr("height",h);	
	
	function barChart(wombatSightings){
	svg1.selectAll("rect")
		.data(wombatSightings)
		.enter()
		.append("rect")
		.attr("x", function(d,i){
			return i * (w / wombatSightings.length); //Reference the column-name to get value
			})
		.attr("y", function(d){
			return h - (d.wombats * 4);
			})
		.attr("width", function(d){
			return (w / wombatSightings.length - barPadding);
			})
		.attr("height", function(d){
			return (d.wombats * 4);
			})
		//RGB color for the bar chart based on the height of the value
		.attr("fill", function(d) {
    		return "rgb(0, 0, " + (d.wombats * 10) + ")";
 			});

		svg2.selectAll("text")
                .data(wombatSightings)
                .enter()
                .append("text")
                .text(function(d){
                        return d.wombats;
                    })
                .attr("x", function(d, i){
                        return i * (w /wombatSightings.length);
                    })
                .attr("y", function(d){
                        return h -90 ;              
                    });
	}
	
}
window.onload= init;

