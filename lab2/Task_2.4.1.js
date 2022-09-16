function init(){
    d3.csv("pet_ownership.csv").then(function(data){
        console.log(data);
        wombatSightings=data;
    
        barChart(wombatSightings)
        barChart2(wombatSightings)
        barChartLabel(wombatSightings);
    });
    
    var w = 500;
	var h = 100;
	var barPadding=5;
	
	var svg1 = d3.select("#chart")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
                
	var svg2 = d3.select("#chart2")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
    var svg3 = d3.select("#label")
                .append("svg")
				.attr("width",w)
				.attr("height",h);
    var svg4 = d3.select("#label2")
                .append("svg")
				.attr("width",w)
				.attr("height",h);
    
	function barChart(wombatSightings){
	svg1.selectAll("rect")
		.data(wombatSightings)
		.enter()
		.append("rect")
		.attr("x", function(d,i){
			return i * (w / wombatSightings.length);
			})
		.attr("y", function(d){
			return h - (d.pets2019 * 4);
			})
        .attr("fill", function(d) {
    		return "rgb(0, 0, " + (d.pets2019 * 10) + ")";
		})
		.attr("width", function(d){
			return (w / wombatSightings.length - barPadding);
			})
		.attr("height", function(d){
			return (d.pets2019 * 4);
			});

    svg3.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .text(function(d){
                return d.animal;
            })
        .attr("x", function(d, i){
                return i * (w /wombatSightings.length);
            })
        .attr("y", function(d){
                return h -90 ;              
            });
}
    

    function barChart2(wombatSightings){
        svg2.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return i * (w / wombatSightings.length);
                })
            .attr("y", function(d){
                return h - (d.pets2021 * 4);
                })
            .attr("fill", function(d) {
                return "rgb(0, 0, " + (d.pets2021 * 10) + ")";
            })
            .attr("width", function(d){
                return (w / wombatSightings.length - barPadding);
                })
                .attr("height", function(d){
                return (d.pets2021 * 4);
                });
                
        svg4.selectAll("text")
                .data(wombatSightings)
                .enter()
                .append("text")
                .text(function(d){
                        return d.animal;
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