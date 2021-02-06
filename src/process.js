const fs = require('fs');
const path = require('path');
const projects = require('../data/projects.json');
const projectmembers = require('../data/sorted-projectmember.json');

let numOfUniqueApplicants = Object.keys(projectmembers).length;
let applicantsPerQuarter = [];
let applicantsInfoPerQuarter = [];
let extendedProjectInfo = projects;

const index2Quarter = (index, leadFlag=true) => {
  const quarters = ['Winter', 'Spring', 'Fall'];

  const startQuarter = leadFlag ? ['Spring', '2017'] : ['Fall', '2016'];

  const increaseQuarters = Math.floor(index%3);
  const increaseYears = Math.floor(index/3);

  const nqi = quarters.indexOf(startQuarter[0]) + increaseQuarters;
  const quarter = nqi > 2 ? quarters[nqi - 3] : quarters[nqi];
  const year = +startQuarter[1] + (nqi > 2 ? increaseYears + 1 : increaseYears);

  return [quarter, year];
};

const contents = () => `
# Insights

Number of total unique applications: \`${numOfUniqueApplicants}\`

${applicantsPerQuarter.reduce((acc, n, i) => {
  const [q, y] = index2Quarter(i, false);
  return `${acc}\n| ${q} | ${y} | ${n} |`;
}, '| Quarter | Year | Number of Applications |\n| --- | --- | --- |')}
`;

function main() {
  process.stdout.write('Factor member logistics ..\n');
  memberLogistics();
  process.stdout.write('Factor projects logistics ..\n');
  projectLogistics();
  process.stdout.write('Writing to extended projects information to file ..\n');
  fs.writeFileSync(path.resolve(__dirname, '../data/projects-extended.json'), JSON.stringify(extendedProjectInfo, null, 2));
  fs.writeFileSync(path.resolve(__dirname, 'README.md'), contents());
  process.stdout.write('✅ Done\n');
}

const choices = {
  first: 0,
  second: 0,
  third: 0,
};

function projectLogistics() {
  applicantsInfoPerQuarter.map((quarter, quarterIndex) => {
    if (quarterIndex < 2) return;

    let freq_map = {};
    quarter.choices.map((memberChoices) => {
      Object.keys(memberChoices).map((priority) => {
        const choice = memberChoices[`${priority}`];
        if (!freq_map[choice]) {
          freq_map[choice] = {...choices};
        }
        freq_map[choice][priority]++;
      });
    });
    const [q, y] = index2Quarter(quarterIndex-2);

    extendedProjectInfo[y][q].num_of_applicants = applicantsPerQuarter[quarterIndex-2];
    extendedProjectInfo[y][q].application_map = freq_map;
    extendedProjectInfo[y][q].timestamps = quarter.timestamps;
  });
}

function memberLogistics () {
  Object.keys(projectmembers).map((email) => {
    const member = projectmembers[email];
    member.quarterBitmap.map((status, i) => {
      if (applicantsPerQuarter.length < i + 1){
        applicantsInfoPerQuarter.push({
          timestamps: [],
          choices: [],
        });
        applicantsPerQuarter.push(0);
      }
      if (status) {
        applicantsPerQuarter[i]++;
        applicantsInfoPerQuarter[i].timestamps.push(member.quarterInfo[i].timestamp);
        applicantsInfoPerQuarter[i].choices.push(member.quarterInfo[i].choices);
      }
    });
  });
}

main();