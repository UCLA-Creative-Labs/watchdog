
// const data = require('projectmember.json');
// console.log(data);

// var margin = {top: 10, right: 30, bottom: 30, left: 40},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// var svg = d3.select("#dataviz_area")
// .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");


var width = 900, height = 300, pad = 20, left_pad = 100;
var x = d3.scale.ordinal().rangeRoundBands([left_pad, width - pad], 0.1);
var y = d3.scale.linear().range([height-pad, pad]);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

var svg = d3.select("#graph").append("svg").attr("width", width).attr("height", height);


let proj_data = {};
d3.json("projects.json").then((res) => {
   project_sort(res);
});

function project_sort(data) {
  let editdata = d3.keys(data).map(function (key) {
    console.log(data);
  });
    
    x.domain(data.map(function (d) { return d.bucket; }));
    y.domain([0, d3.max(data, function (d) { return d.N; })]);

    svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0, "+(height-pad)+")")
  .call(xAxis);

  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate("+(left_pad-pad)+", 0)")
  .call(yAxis);

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', function (d) { return x(d.bucket); })
  .attr('width', x.rangeBand())
  .attr('y', function (d) { return y(d.N); })
  .attr('height', function (d) { return height-pad - y(d.N); });
}

// function project_sort (data){
//   var x = d3.scaleLinear()
//   .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
//   .range([0, width]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // set the parameters for the histogram
//   var histogram = d3.histogram()
//     .value(function(d) { return d.price; })   // I need to give the vector of value
//     .domain(x.domain())  // then the domain of the graphic
//     .thresholds(x.ticks(70)); // then the numbers of bins

//   // And apply this function to data to get the bins
//   var bins = histogram(data);

//   // Y axis: scale and draw:
//   var y = d3.scaleLinear()
//     .range([height, 0]);
//     y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // append the bar rectangles to the svg element
//   svg.selectAll("rect")
//     .data(bins)
//     .enter()
//     .append("rect")
//       .attr("x", 1)
//       .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
//       .attr("width", function(d) { return 5 ; })
//       .attr("height", function(d) { return height - y(d.length); })
//       .style("fill", "#69b3a2")
//   }
