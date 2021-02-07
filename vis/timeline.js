const quarters = ['Winter', 'Spring', 'Fall'];
const msInDay = 1000*60*60*24;

d3.json("projects-extended.json").then((data) => {
  let x_data = [];
  let y_data = [];
  let qualified_quarters = 0;
  let heat_map = {};

  const years = Object.keys(data);
  years.map((year) => {
    const quarters = Object.keys(data[year]).reverse();
    quarters.map((quarter) => {
      const timestamps = data[year][quarter].timestamps;

      if (timestamps.every((v) => !v) || year < '2018' || (year == '2018' && quarter == 'Winter')) return;
      
      const dates = timestamps.map((v) => new Date(v));
      const sorted_dates = dates.sort((a, b) => a < b ? -1 : 1);
      sorted_dates.forEach((date) => date.setHours(0,0,0,0));

      const start_date = sorted_dates[0];
      const normalized_dates = sorted_dates.map((date) => {
        const diff = date.getTime() - start_date.getTime();
        return (Math.floor(diff / msInDay) + 1);
      });
      
      const quarter_heat_map = normalized_dates.reduce((acc, v) => {
        acc[v] = acc[v] ? acc[v] + 1 : 1;
        return acc;
      }, {});

      Object.keys(quarter_heat_map).forEach(key => {
        if (key == 'NaN' || key == '22') return;
        quarter_heat_map[key] /= normalized_dates.length;
        if (!heat_map[key]) heat_map[key] = 0;
        heat_map[key] += quarter_heat_map[key];
      });
      
      qualified_quarters++;
    });
  });

  x_data = Object.keys(heat_map).map((v) => +v);
  y_data = Object.values(heat_map).map((v) => v / qualified_quarters);

  Plotly.newPlot('timeline', [{
    x: x_data,
    y: y_data,
    type: 'line',
  }], {
    title: 'Percent of applications vs. Days since applications drop',
    xaxis: {title: 'Days'},
    yaxis: {title: 'Percentage of Applicants'}
  });
});

 