var x_data = [];
var y_data = [];
var y2_data = [81, 91, 88, 123, 43, 154, 171, 106, 142, 185, 144, 78, 124, 53];
var y3_data = [];

d3.json("projects-extended.json").then((res) => {
    Object.keys(res).forEach(year => {
        const quarters = Object.keys(res[year]).reverse();
        const quartersinfo = Object.values(res[year]).reverse();
        for(var i = 0; i < Object.values(quarters).length; i++){
            var quarter = year + " " + Object.values(quarters)[i];
            x_data.push(quarter);
            y_data.push(Object.keys(Object.values(quartersinfo)[i]).length-3);

            var project = Object.values(Object.values(quartersinfo)[i]);
            var count = 0;
            for (var k = 0; k< y_data[count]; k++)
            {
                y3_data.push(project[k]);
            }
            count++;
        }
    });

    x_data.unshift("2016 Fall", "2017 Winter");
    y_data.unshift(0, 0);
    
    var trace1 =
    {
        x: x_data,
        y: y_data,
        yaxis: "y1",
        name: 'Number of Projects',
        type: 'bar',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
        }
    };

    var trace2 = 
    {
          x: x_data,
          y: y2_data,
          yaxis: "y2",
          name: 'Number of Applicants',
          type: 'scatter',
          marker: {
            color: 'rgb(255,0,0)',
            opacity: 0.6,
            line: {
              color: 'rgb(255, 0, 0)',
              width: 1.5
            }
          }
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

 var year_info = [];
 var major_info = [];
 var year_clean = [];
 var major_clean = [];
 var y_year = [0,0,0,0,0];
 var y_major = [0,0,0,0,0,0,0,0,0,0,0];
 d3.json("sorted-projectmember.json").then((res) => {
    Object.keys(res).forEach(applicant => { 
        const applicantinfo = Object.values(res[applicant]); 
        year_info.push((applicantinfo)[1]);
        year_info.push((applicantinfo)[0]);
        major_info.push((applicantinfo)[0]);
    }); 
    for (index in year_info) {
        var info = year_info[index];
        if(info=="1" || info=="1st" || info=='2' || info=="2nd" ||
        info=="3" || info=="3rd" || info=="4" || info=="4+" || info=="4th" || info=="4th+") {
            year_clean.push(info);
        }
    }
    for (index in major_info){
        var info = major_info[index];
        if (!(info=="1" || info=="1st" || info=='2' || info=="2nd" ||
        info=="3" || info=="3rd" || info=="4" || info=="4+" || info=="4th" || info=="4th+") && (typeof info === 'string') || (info instanceof String)) {
            major_clean.push(info);
        }
    }
    
    for (index in year_clean) {
        switch (year_clean[index]) {
            case "1":
            case "1st":
                y_year[0]++;
                break;
            case "2":
            case "2nd":
                y_year[1]++;
                break;
            case "3":
            case "3rd":
                y_year[2]++;
                break;
            case "4":
            case "4th":
                y_year[3]++;
                break;
            case "4+":
            case "4th+":
                y_year[4]++;
                break;
        }
    }

    var data_year = {
        x: ["First Year", "Second Year", "Third Year", "Fourth Year", "4+"],
        y: y_year,
        type: 'bar',
        marker: {
            color: 'rgb(0,20,225)',
            opacity: 0.6,
        }
    };

    for (index in major_clean) {
        info = major_clean[index];
        if (info.includes("omputer") || info.includes("CS")) {
            y_major[0]++;
        }
        else if (info.includes("ognitive") || info.includes("Cog")) {
            y_major[1]++;
        }
        else if (info.includes("ocial")) {
            y_major[10]++;
        }
        else if (info.includes("ology") || info.includes("cience") || info.includes("MCDB") || info.includes("Comp")) {
            y_major[2]++;
        }
        else if (info.includes("ngineer") || info.includes("EE")) {
            y_major[3]++;
        }
        else if (info.includes("ath") || info.includes("tatistics")) {
            y_major[4]++;
        }
        else if (info.includes("con")) {
            y_major[5]++;
        }
        else if (info.includes("esign") || info.includes("DESMA") || info.includes("DMA")) {
            y_major[6]++;
        }
        else if (info.includes("omm")) {
            y_major[7]++;
        }
        else if (info.includes("hysics")) {
            y_major[8]++;
        }
        else if (info.includes("cs")) {
            y_major[0]++;
        }
        else if (info.includes("hemistry")) {
            y_major[9]++;
        }
        else {
            y_major[10]++;
            // console.log(info);
        }
    }

    var data_major = {
        x: ["Computer Science/CS", "Cognitive Science", "Life Sciences", 
            "Engineering", "Math", "Econ", "DESMA", "Communications",
            "Physics", "Chemistry", "Other"],
        y: y_major,
        type: 'bar',
        marker: {
            color: 'rgb(85,100,50)',
            opacity: 0.6,
        }
    }

    var layout_year = {
        title: "Years of Applicants",
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Number of Applicants'
        },
    };

    var layout_major = {
        title: "Majors of Applicants",
        xaxis: {
            title: 'Major'
        },
        yaxis: {
            title: 'Number of Applicants'
        },
    };

    Plotly.newPlot('year', [data_year], layout_year);
    Plotly.newPlot('major', [data_major], layout_major);
 });



