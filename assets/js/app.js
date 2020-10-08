// Chart parameters
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 60,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Get Data
d3.csv("/assets/data/data.csv").then(function(stateData) {
    stateData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.income = +data.income;

  });

// Axis
var xScale = d3.scaleLinear()
    .domain([35000, d3.max(stateData, d => d.income)+1200])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain([4, d3.max(stateData, d => d.healthcare)+1.5])
    .range([height, 0]);

var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);  

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);

chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - (height / 1.30))
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top + 12})`)
    .text("Average Housecome Income ($)");

// Markers
var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.income))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", 9)
    .attr("fill", "gray")
    .attr("opacity", ".5")
    .attr("stroke", "white");    

chartGroup.append("text")
    .style("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "7px")
    .selectAll("tspan")
    .data(stateData)
    .enter()
    .append("tspan")
    .attr("x", function(data) {
     return xScale(data.income);
    })
    .attr("y", function(data) {
        return yScale(data.healthcare -.1);
    })
    .text(function(data) {
        return data.abbr
    });

});