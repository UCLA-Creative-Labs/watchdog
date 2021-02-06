var x_data = [];
var x2_data = [];
var y_data = [];
var y2_data = [81, 91, 88, 123, 43, 154, 171, 106, 142, 185, 144, 78, 124, 53];

d3.json("projects-extended.json").then((res) => {
    Object.keys(res).forEach(year => {
        const quarters = Object.keys(res[year]).reverse();
        const quartersinfo = Object.values(res[year]).reverse();
        for (var i = 0; i < Object.values(quarters).length; i++){
            var quarter = year + " " + Object.values(quarters)[i];
            x_data.push(quarter);
            y_data.push(Object.keys(Object.values(quartersinfo)[i]).length-3);
        }
    });

    // d3.json("../data/sorted-projectmember.json").then((res) => {
    //     for(int i = 0; i<res.length; i++){
    //         y2.push();
    //     }
    //  });

    var data = [
        {
          x: x_data,
          y: y_data,
          type: 'bar'
        }
    ];
    var data2 = [
        {
          x: x_data,
          y2: y2_data,
          type: 'bar'
        }
    ];
    var alldata = [data, data2];
    Plotly.newPlot('tester', alldata);
 });

 