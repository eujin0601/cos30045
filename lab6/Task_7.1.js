function init(){
    
	var w = 600;
    var h = 300;
	var padding=10;
    var dataset 
    
    d3.csv("Unemployment_78-95.csv", function(d){
        return {

            date: new Date (+d.year, +d.month-1),
            number: +d.number
        };
    }).then(function(data){
        dataset = data;

        lineChart(dataset);
        
    });
        
        console.table(dataset, ["date","number"]);

        function lineChart(dataset){

            
            xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d){
                    return d.date;
                }),
                d3.max(dataset, function(d){
                    return d.date;
                })
            ])
            .range([0,w]);

            area = d3.area()
                    .x(function (d){
                        return xScale(d.date)+55;
                    })
                    .y0(function(){
                        return yScale.range()[0];
                    })
                    .y1(function(d){
                        return yScale(d.number);
                    });

            yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d){
                        return d.number;
                    })])
                    .range ([h,0]);
            
            var xAxis=d3.axisBottom()
                    .ticks(5)
                .scale(xScale);

            var yAxis=d3.axisLeft()
                    .ticks(8)
                .scale(yScale);
            
            line = d3.line()
                    .x(function(d){
                        return xScale(d.date);
                    })
                    .y(function(d){
                        return yScale(d.number);
                    });
                
            var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w+60)
                    .attr("height", h+40);

            svg.append("path")
                .datum(dataset)
                .attr("class", "area")
                .attr("d", area);
                
            
            svg.append("line")
                .attr("class", "line halfMilMark")
                .attr("x1",padding+45)
                .attr("y1",yScale(500000))
                .attr("x2", w+55)
                .attr("y2", yScale(500000))
                .style("stroke-dasharray", ("3, 3"));

            svg.append("text")
                .attr("class", "halfMilLabel")
                .attr("x", padding+50)
                .attr("y", yScale(500000)-7)
                .text("Half a million unemployed")
                .attr("fill","red");
            
            svg.append("g")
                .attr("transform","translate(55, "+(h - padding+10) +")")
                .call(xAxis);
            svg.append("g")
                .attr("transform","translate("+(padding+45) +")")
                .call(yAxis);
        } 
        
    }
	
window.onload= init;
