var x_data = [];
var y_data = [];
var y2_data = [81, 91, 88, 123, 43, 154, 171, 106, 142, 185, 144, 78, 124, 53];
var y3_data = [];
const _D3 = d3;
const _Plotly = Plotly;

_D3.json('projects-extended.json').then((res) => {
    Object.keys(res).forEach(year => {
        const quarters = Object.keys(res[year]).reverse();
        const quartersinfo = Object.values(res[year]).reverse();
        for(var i = 0; i < Object.values(quarters).length; i++){
            var quarter = year + ' ' + Object.values(quarters)[i];
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

    x_data.unshift('2016 Fall', '2017 Winter');
    y_data.unshift(0, 0);

    var trace1 =
    {
        x: x_data,
        y: y_data,
        yaxis: 'y1',
        name: 'Number of Projects',
        type: 'bar',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
        },
    };

    var trace2 =
    {
          x: x_data,
          y: y2_data,
          yaxis: 'y2',
          name: 'Number of Applicants',
          type: 'scatter',
          marker: {
            color: 'rgb(255,0,0)',
            opacity: 0.6,
            line: {
              color: 'rgb(255, 0, 0)',
              width: 1.5,
            },
          },
    };

    var layout = {
        title: 'Number of Applicants vs Number of Projects',
        xaxis: {
            title: 'Timeline',
        },
        yaxis: {
            title: 'Number of Projects',
        },
        yaxis2: {
            title: 'Number of Applicants',
            overlaying: 'y',
            side: 'right',
        },
    };

    var alldata = [trace1, trace2];

    _Plotly.newPlot('apps_proj', alldata, layout);
 });

 var year_info = [];
 var major_info = [];
 var year_clean = [];
 var major_clean = [];
 var y_year = [0,0,0,0,0];
 var y_major = [0,0,0,0,0,0,0,0,0,0,0];
_D3.json('sorted-projectmember.json').then((res) => {
    Object.keys(res).forEach(applicant => {
        const applicantinfo = Object.values(res[applicant]);
        year_info.push((applicantinfo)[1]);
        year_info.push((applicantinfo)[0]);
        major_info.push((applicantinfo)[0]);
    });

    const VALID_YEARS = ['1', '2', '3', '4', '4+'];
    const regex = /st|nd|rd|th/gi;
    const regex_major = /1st|2nd|3rd|4th|4th+/gi;

    year_info.map(info => {
        if (typeof info == 'string') {
            info = info.replace(regex, '');
        }
        if(VALID_YEARS.includes(info)) {
            year_clean.push(info);
        }
    });

    major_info.map(info => {
        if (typeof info == 'string') {
            info = info.replace(regex_major, '1');
        }
        if (!VALID_YEARS.includes(info) && ((typeof info === 'string') || (info instanceof String)) && (info !='')) {
            major_clean.push(info);
        }
    });

    year_clean.map(info => {
        switch (info) {
            case '1':
                y_year[0]++;
                break;
            case '2':
                y_year[1]++;
                break;
            case '3':
                y_year[2]++;
                break;
            case '4':
                y_year[3]++;
                break;
            case '4+':
                y_year[4]++;
                break;
        }
    });

    var data_year = {
        x: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', '4+'],
        y: y_year,
        type: 'bar',
        marker: {
            color: 'rgb(0,20,225)',
            opacity: 0.6,
        },
    };

    major_clean.map(info => {
        if (info.includes('omputer') || info.includes('CS')) {
            y_major[0]++;
        }
        else if (info.includes('ognitive') || info.includes('Cog')) {
            y_major[1]++;
        }
        else if (info.includes('ocial')) {
            y_major[10]++;
        }
        else if (info.includes('ology') || info.includes('cience') || info.includes('MCDB') || info.includes('Comp')) {
            y_major[2]++;
        }
        else if (info.includes('ngineer') || info.includes('EE')) {
            y_major[3]++;
        }
        else if (info.includes('ath') || info.includes('tatistics')) {
            y_major[4]++;
        }
        else if (info.includes('con')) {
            y_major[5]++;
        }
        else if (info.includes('esign') || info.includes('DESMA') || info.includes('DMA')) {
            y_major[6]++;
        }
        else if (info.includes('omm')) {
            y_major[7]++;
        }
        else if (info.includes('hysics')) {
            y_major[8]++;
        }
        else if (info.includes('cs')) {
            y_major[0]++;
        }
        else if (info.includes('hemistry')) {
            y_major[9]++;
        }
        else {
            y_major[10]++;
        }
    });

    var data_major = {
        x: ['Computer Science/CS', 'Cognitive Science', 'Life Sciences',
            'Engineering', 'Math', 'Econ', 'DESMA', 'Communications',
            'Physics', 'Chemistry', 'Other'],
        y: y_major,
        type: 'bar',
        marker: {
            color: 'rgb(85,100,50)',
            opacity: 0.6,
        },
    };

    var layout_year = {
        title: 'Years of Applicants',
        xaxis: {
            title: 'Year',
        },
        yaxis: {
            title: 'Number of Applicants',
        },
    };

    var layout_major = {
        title: 'Majors of Applicants',
        xaxis: {
            title: 'Major',
        },
        yaxis: {
            title: 'Number of Applicants',
        },
    };

    _Plotly.newPlot('year', [data_year], layout_year);
    _Plotly.newPlot('major', [data_major], layout_major);
 });


