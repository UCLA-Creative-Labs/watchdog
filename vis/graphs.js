/* eslint-disable no-undef */

var num_projects = [];
var y_descriptions = [];
var type_quarter = [];

d3.json('projects-extended.json').then((res) => {
    Object.keys(res).forEach(year => {
        const quarters = Object.keys(res[year]).reverse();
        const quartersinfo = Object.values(res[year]).reverse();
        for(let i = 0; i < Object.values(quarters).length; i++){
            let quarter = year + ' ' + Object.values(quarters)[i];
            type_quarter.push(quarter);
            num_projects.push(Object.keys(Object.values(quartersinfo)[i]).length-3);

            let project = Object.values(quartersinfo)[i];
            project_desc = Object.values(project).filter(x => x.Description);
            y_descriptions.push(project_desc);
        }
    });

    let proj_type_num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // number of projects for each category
    let proj_type_quarter = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


    for (quarter in y_descriptions) {
        for (desc in y_descriptions[quarter]) {
            let info = y_descriptions[quarter][desc];
            for (i in info)
            {
                if(info[i].includes('tech')) {
                    proj_type_num[0]++;
                    proj_type_quarter[quarter][0]++;
                }
                else if (info[i].includes('non')){
                    proj_type_num[1]++;
                    proj_type_quarter[quarter][1]++;
                }
                if(info[i].includes('web')) {
                    proj_type_num[2]++;
                    proj_type_quarter[quarter][2]++;
                }
                if(info[i].includes('app')) {
                    proj_type_num[4]++;
                    proj_type_quarter[quarter][4]++;
                }
                if(info[i].includes('art')) {
                    proj_type_num[3]++;
                    proj_type_quarter[quarter][3]++;
                }
                else if(info[i].includes('ar')) {
                    proj_type_num[8]++;
                    proj_type_quarter[quarter][8]++;
                }
                if(info[i].includes('game')) {
                    proj_type_num[5]++;
                    proj_type_quarter[quarter][5]++;
                }
                if(info[i].includes('writing')) {
                    proj_type_num[7]++;
                    proj_type_quarter[quarter][7]++;
                }
                if(info[i].includes('iot')) {
                    proj_type_num[6]++;
                    proj_type_quarter[quarter][6]++;
                }
                if(info[i].includes('vr')) {
                    proj_type_num[9]++;
                    proj_type_quarter[quarter][9]++;
                }

            }
        }
    }

    var proj_type = {
        x: ['Tech', 'Non-tech', 'Web', 'Art', 'App', 'Game', 'IoT', 'Writing', 'AR', 'VR'],
        y: proj_type_num,
        type: 'bar',
    };
    var layout_proj_type = {
        title: 'Number of Projects by Type',
        xaxis: {
            title: 'Project Types',
        },
        yaxis: {
            title: 'Number of Projects',
        },
    };

    Plotly.newPlot('graphs', [proj_type], layout_proj_type);
    var sub = 0;
    // type_quarter = type_quarter.slice(2);
    var q1 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Tech',
    };
    sub++;
    var q2 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Non-tech',
    };
    sub++;
    var q3 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Web',
    };
    sub++;
    var q4 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Art',
    };
    sub++;
    var q5 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub],proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'App',
    };
    sub++;
    var q6 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Game',
    };
    sub++;
    var q7 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'IoT',
    };
    sub++;
    var q8 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'Writing',
    };
    sub++;
    var q9 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'AR',
    };
    sub++;
    var q10 = {
        x: type_quarter,
        y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
            proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
            proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
            proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
        type: 'bar',
        name: 'VR',
    };

    var data = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

    var layout_proj_quarters = {
        title: 'Number of Projects by Type per Quarter',
        xaxis: {
            title: 'Quarters',
        },
        yaxis: {
            title: 'Number of Projects',
        },
        barmode: 'stack',
    };
    Plotly.newPlot('type', data, layout_proj_quarters);
});

