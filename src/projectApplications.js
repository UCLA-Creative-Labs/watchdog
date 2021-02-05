const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const ALL_QUARTERS_ID = '16vmuNiN-8mij8EoEIwvQ_wde9DgF_0IWXfT_95SHfcc';

const endQuarter = ['Winter', '2021'];
const startQuarter = ['Fall', '2016'];
const quarters = ['Winter', 'Spring', 'Fall'];

function isGreater(current, end) {
  return (current[1] < end[1] ||
    (current[1] == end[1] && quarters.indexOf(current[0]) <= quarters.indexOf(end[0])));
}

function init () {
  let q2I = {};
  let current = [...startQuarter];
  let num = 0;

  while(isGreater(current, endQuarter)) {
    if (!q2I[current[1]]) q2I[current[1]] = {};
    q2I[current[1]][current[0]] = num;
    num++;

    // Increment current
    const nextQuarter = current[0] === quarters.slice(-1)[0]
      ? 0
      : quarters.indexOf(current[0]) + 1;
    if (nextQuarter === 0)
      current[1]++;
    current[0] = quarters[nextQuarter];
  }

  return [q2I, num];
}
const [quarter2Index, numOfQuarters] = init();
// Load client secrets from a service account
fs.readFile(path.resolve(__dirname, '../credentials.json'), (err, content) => {
  authorize(JSON.parse(content), main);
});

function authorize(credentials, callback) {
  const jwt = new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
  callback(jwt);
}

function main(auth) {
  process.stdout.write('Parsing project sheet .. ');
  readProjectMemberSheet(auth);
}

function readProjectMemberSheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  let current = [...startQuarter];
  let masterDict = {};

  while(isGreater(current, endQuarter)){

    const currentQuarter = current[0];
    const currentYear = current[1];
    const index = quarter2Index[currentYear][currentQuarter];

    // Run on current quarter
    sheets.spreadsheets.values.get({
      spreadsheetId: ALL_QUARTERS_ID,
      range: `${current[0]} ${current[1]}!A:Z`,
    }).then((response) => {
      const info = formatProjectMemberResponse(response);

      for(let i = 0; i<info.length; i++) {
        const [email, major, year, status, timestamp, choices] = info[i];
        if(!(email in masterDict)) {
          let quarter = new Array(numOfQuarters).fill(0);
          let quarterInfo = new Array(numOfQuarters).fill(undefined);
          quarter[index] = status;
          quarterInfo[index] = {
            timestamp: timestamp,
            choices: choices,
          };
          masterDict[email] = {
            major: major,
            year: year,
            quarterBitmap: quarter,
            quarterInfo,
          };
        }
        else {
          const qbm = masterDict[email].quarterBitmap;
          const firstQuarter = qbm.findIndex(x => x > 0);
          if (index < firstQuarter) {
            masterDict[email].year = year;
          }
          masterDict[email].quarterBitmap[index] = status;
          masterDict[email].quarterInfo[index] = {
            timestamp: timestamp,
            choices: choices,
          };
        }
      }
      fs.writeFileSync(path.resolve(__dirname, '../data/projectmember.json'), JSON.stringify(masterDict, null, 2));
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

/*
 * Take the applications for a given quarter
 * and format them to a uniform object
 */
function formatProjectMemberResponse(response) {
  const values = response.data.values;
  const major = 'What\'s your major?';
  const first = 'First Choice:';
  const second = 'Second Choice:';
  const third = 'Third Choice:';
  const validKeys = ['Email', major, 'Year', 'Accepted', first, second, third, 'Timestamp'];
  let label2Index = {};
  values[0].map((label, index) => {
    label2Index[label] = validKeys.includes(label) ? index : -1;
  });
  return values.slice(1).map((memberapps) => {
    const choices = {
      first: label2Index[`${first}`] < 0
        ? undefined
        : memberapps[label2Index[`${first}`]],
      second: label2Index[`${second
      }`] < 0
        ? undefined
        : memberapps[label2Index[`${second}`]],
      third: label2Index[`${third}`] < 0
        ? undefined
        : memberapps[label2Index[`${third}`]],
    };

    Object.keys(choices).forEach((key) => {
      if (!choices[key]) return;

      if (choices[key] === 'None') {
        choices[key] = undefined;
      }
      else {
        const split = choices[key].split(' : ');
        if (split.length > 1) {
          choices[key] = split[1];
        }
      }
    });
    return [
      memberapps[label2Index.Email],
      label2Index[`${major}`] < 0 ? undefined : memberapps[label2Index[`${major}`]],
      label2Index.Year < 0 ? undefined : memberapps[label2Index.Year],
      memberapps[label2Index.Accepted] ? 2 : 1,
      memberapps[label2Index.Timestamp],
      choices,
    ];
  });
}