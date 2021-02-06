var x_data = [];
var y_data = [];
var y2_data = [81, 91, 88, 123, 43, 154, 171, 106, 142, 185, 144, 78, 124, 53];

d3.json("projects-extended.json").then((res) => {
    Object.keys(res).forEach(year => {
        const quarters = Object.keys(res[year]).reverse();
        const quartersinfo = Object.values(res[year]).reverse();
        for(var i = 0; i < Object.values(quarters).length; i++){
            var quarter = year + " " + Object.values(quarters)[i];
            x_data.push(quarter);
            y_data.push(Object.keys(Object.values(quartersinfo)[i]).length-3);
        }
    });

    x_data.unshift("2016 Fall", "2017 Winter");
    y_data.unshift(0, 0);
    
    var trace1 =
    {
        x: x_data,
        y: y_data,
        yaxis: "y1",
        type: 'bar'
    };

    var trace2 = 
    {
          x: x_data,
          y: y2_data,
          yaxis: "y2",
          type: 'scatter'
    };
    
    var layout = {
        title: "Number of Applicants vs Number of Projects",
        xaxis: {
            title: 'Timeline'
        },
        yaxis: {
            title: 'Number of Projects'
        },
        yaxis2: {
            title: 'Number of Applicants',
            overlaying: 'y',
            side: 'right'
        }
    };

    var alldata = [trace1, trace2];
    
    Plotly.newPlot('apps_proj', alldata, layout);
 });

 