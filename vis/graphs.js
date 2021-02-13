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

    let quarter_count = 0;
    y_descriptions.map(quarter => {
        quarter.map(desc => {
            for (i in desc) {
                if(desc[i].includes('tech')) {
                    proj_type_num[0]++;
                    proj_type_quarter[quarter_count][0]++;
                }
                else if (desc[i].includes('non')){
                    proj_type_num[1]++;
                    proj_type_quarter[quarter_count][1]++;
                }
                if(desc[i].includes('web')) {
                    proj_type_num[7]++;
                    proj_type_quarter[quarter_count][7]++;
                }
                if(desc[i].includes('app')) {
                    proj_type_num[4]++;
                    proj_type_quarter[quarter_count][4]++;
                }
                if(desc[i].includes('art')) {
                    proj_type_num[3]++;
                    proj_type_quarter[quarter_count][3]++;
                }
                else if(desc[i].includes('ar')) {
                    proj_type_num[8]++;
                    proj_type_quarter[quarter_count][8]++;
                }
                if(desc[i].includes('game')) {
                    proj_type_num[5]++;
                    proj_type_quarter[quarter_count][5]++;
                }
                if(desc[i].includes('writing')) {
                    proj_type_num[2]++;
                    proj_type_quarter[quarter_count][2]++;
                }
                if(desc[i].includes('iot')) {
                    proj_type_num[6]++;
                    proj_type_quarter[quarter_count][6]++;
                }
                if(desc[i].includes('vr')) {
                    proj_type_num[9]++;
                    proj_type_quarter[quarter_count][9]++;
                }
            }
        });
        quarter_count++;
    });

    let data_projects = [];
    let index = 2;
    let proj = [];
    let project_names_only = ['Writing', 'Art', 'App', 'Game', 'IoT', 'Web', 'AR', 'VR'];
    project_names_only.map(proj_type => {
        if (proj_type == 'Writing' || proj_type == 'Art') {
            proj = {
                x: ['Tech', 'Non-tech'],
                y: [0, proj_type_num[index]],
                type: 'bar',
                name: project_names_only[index-2],
            };
        }
        else {
            proj = {
                x: ['Tech', 'Non-tech'],
                y: [proj_type_num[index], 0],
                type: 'bar',
                name: project_names_only[index-2],
            };
        }
        data_projects.push(proj);
        index++;
    });

    var layout_proj_type = {
        title: 'Number of Projects by Type',
        xaxis: {
            title: 'Project Types',
        },
        yaxis: {
            title: 'Number of Projects',
        },
        barmode: 'stack',
    };
    Plotly.newPlot('graphs', data_projects, layout_proj_type);

    let data = [];
    let sub = 0;
    let project_names = ['Tech', 'Non-tech', 'Writing', 'Art', 'App', 'Game', 'IoT', 'Web', 'AR', 'VR'];

    project_names.map(category => {
        var stacked = {
            x: type_quarter,
            y: [proj_type_quarter[0][sub], proj_type_quarter[1][sub], proj_type_quarter[2][sub],
                proj_type_quarter[3][sub], proj_type_quarter[4][sub], proj_type_quarter[5][sub],
                proj_type_quarter[6][sub], proj_type_quarter[7][sub], proj_type_quarter[8][sub],
                proj_type_quarter[9][sub], proj_type_quarter[10][sub], proj_type_quarter[11][sub]],
            type: 'bar',
            name: category,
        };
        data.push(stacked);
        sub++;
    });

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

