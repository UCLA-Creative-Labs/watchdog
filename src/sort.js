const fs = require('fs');
const path = require('path');

const projectmember = require('../projectmember.json');
const projectmemberold = require('../projectmember-old.json');

const keys = Object.keys(projectmember).sort((a, b) => a > b ? 1 : -1);
const keysold = Object.keys(projectmemberold).sort((a, b) => a > b ? 1 : -1);

const new_projectmember = keys.reduce((acc, key) => {
  acc[key] = projectmember[key];
  return acc;
}, {});

const new_projectmemberold = keysold.reduce((acc, key) => {
  acc[key] = projectmemberold[key];
  return acc;
}, {});

fs.writeFileSync(path.resolve(__dirname, '../new-projectmember.json'), JSON.stringify(new_projectmember, null, 2));
fs.writeFileSync(path.resolve(__dirname, '../new-projectmember-old.json'), JSON.stringify(new_projectmemberold, null, 2));