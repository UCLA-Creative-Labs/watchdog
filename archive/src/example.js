const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
// require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const ALL_QUARTERS_ID = '16vmuNiN-8mij8EoEIwvQ_wde9DgF_0IWXfT_95SHfcc';
// const ALL_PLEAD_ID = '18nv5m59ppoZLcjKXYziI-PLNx-dkr8i5Avn1ZnjaGiY';

// Load client secrets from a service account
fs.readFile(path.resolve(__dirname, '../credentials.json'), (err, content) => {
  authorize(JSON.parse(content), readSheets);
});

function authorize(credentials, callback) {
  const jwt = new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
  callback(jwt);
}

function readSheets(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: ALL_QUARTERS_ID,
    range: 'Fall 2016!A:X',
  }).then((response) => formatResponse(response));
}

function formatResponse(response){
  const values = response.data.values;
  if (!values) return;
  fs.writeFileSync(path.resolve(__dirname, '../data/example.json'), JSON.stringify(values, null, 2));
}