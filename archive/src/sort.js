const fs = require('fs');
const path = require('path');

const projectmember = require('../data/projectmember.json');

process.stdout.write('Sorting project member applictaions data .. \n');

const keys = Object.keys(projectmember).sort((a, b) => a > b ? 1 : -1);

const sorted_projectmember = keys.reduce((acc, key) => {
  acc[key] = projectmember[key];
  return acc;
}, {});

fs.writeFileSync(path.resolve(__dirname, '../data/sorted-projectmember.json'), JSON.stringify(sorted_projectmember, null, 2));