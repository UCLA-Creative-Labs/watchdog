const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const ALL_PLEAD_ID = '18nv5m59ppoZLcjKXYziI-PLNx-dkr8i5Avn1ZnjaGiY';

const endQuarter = ['Winter', '2021'];
const startQuarter = ['Spring', '2017'];
const quarters = ['Winter', 'Spring', 'Fall'];

// Load client secrets from a service account
fs.readFile(path.resolve(__dirname, '../credentials.json'), (err, content) => {
  authorize(JSON.parse(content), main);
});

function authorize(credentials, callback) {
  const jwt = new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
  callback(jwt);
}

function main(auth) {
  process.stdout.write('Parsing project lead sheet .. \n');
  readProjectSheet(auth);
}

function batchedJsonCallback(masterDict, savePath, numOfQuarters) {
  if (masterDict.length !== numOfQuarters) return;

  let ret = {};
  masterDict.sort(([a_q, a_y, _a], [b_q, b_y, _b]) => {
    return a_y < b_y || (a_y == b_y && quarters.indexOf(a_q) < quarters.indexOf(b_q)) ? 1 : -1;
  });
  masterDict.map(([quarter, year, info]) => {
    if (!ret[year]) ret[year] = {};
    ret[year][quarter] = info;
  });
  fs.writeFileSync(path.resolve(__dirname, savePath), JSON.stringify(ret, null, 2));
}

function readProjectSheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  let current = startQuarter;
  let masterDict = [];

  while (current[1] < endQuarter[1] ||
    (current[1] == endQuarter[1] && quarters.indexOf(current[0]) <= quarters.indexOf(endQuarter[0]))) {

    const currentQuarter = current[0];
    const currentYear = current[1];

    // Run on current quarter
    sheets.spreadsheets.values.get({
      spreadsheetId: ALL_PLEAD_ID,
      range: `${current[0]} ${current[1]}!A:Z`,
    }).then((response) => {
      const override = currentYear < '2018' || (currentYear == '2018' && quarters.indexOf(currentQuarter) <= quarters.indexOf('Spring'));
      const quarterInfo = formatProjectResponse(response, override);
      masterDict.push([currentQuarter, currentYear, quarterInfo]);
      batchedJsonCallback(masterDict, '../data/projects.json', 12);
    });

    // Increment current
    const nextQuarter = current[0] === quarters.slice(-1)[0]
      ? 0
      : quarters.indexOf(current[0]) + 1;
    if (nextQuarter === 0)
      current[1]++;
    current[0] = quarters[nextQuarter];
  }
}

function formatProjectResponse(response, override=false) {
  const values = response.data.values;
  const validKeys = ['Description', 'Project', 'Accepted'];
  let label2Index = {};
  values[0].map((label, index) => {
    if (validKeys.includes(label)) {
      label2Index[label] = index;
    }
  });
  let projInfo = {};
  values.slice(1).map((accepted) => {
    if (override || accepted[label2Index.Accepted]) {
      projInfo[accepted[label2Index.Project]] = {
        Description: accepted[label2Index.Description],
      };
    }
  });
  return projInfo;
}