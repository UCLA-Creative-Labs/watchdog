const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const ALL_QUARTERS_ID = '16vmuNiN-8mij8EoEIwvQ_wde9DgF_0IWXfT_95SHfcc';

const numOfQuarters = 14;

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
  const endQuarter = ['Winter', '2021'];
  const startQuarter = ['Fall', '2016'];
  const quarters = ['Winter', 'Spring', 'Fall'];
  let current = startQuarter;
  let masterDict = {};
  let count = 0;

  
  while(current[1] < endQuarter[1] ||
    (current[1] == endQuarter[1] && quarters.indexOf(current[0]) <= quarters.indexOf(endQuarter[0]))){
    
    const currentQuarter = current[0];
    const currentYear = current[1];
    // Run on current quarter
    sheets.spreadsheets.values.get({
      spreadsheetId: ALL_QUARTERS_ID,
      range: `${current[0]} ${current[1]}!A:Z`,
    }).then((response) => {
      const info = formatProjectMemberResponse(response);
      let memberinfo = [];
      let quarter = [];
      for(let i = 0; i<info.length; i++) {
        if(!(info[i][0] in masterDict)) {
          quarter = new Array(numOfQuarters).fill(0);
          quarter[count] = 1;
          memberinfo = [info[i][1], info[i][2], quarter];
          masterDict[info[i][0]] = memberinfo;
        }
        else
        {
          quarter[count] = 1;
        }
        if (info[i][3]==2)
        {
          quarter[count] = 2;
        }
      }
      count++;
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
  const validKeys = ['Email', major, 'Year', 'Accepted'];
  let label2Index = {};
  values[0].map((label, index) => {
    label2Index[label] = validKeys.includes(label) ? index : -1;
  });
  return values.slice(1).map((memberapps) => {
    return [
      memberapps[label2Index.Email],
      label2Index[`${major}`] < 0 ? undefined : memberapps[label2Index[`${major}`]],
      label2Index.Year < 0 ? undefined : memberapps[label2Index.Year],
      memberapps[label2Index.Accepted] ? 2 : 1,
    ];
  });
}