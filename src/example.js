const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
require('dotenv').config();

const ALL_QUARTERS_ID = '16vmuNiN-8mij8EoEIwvQ_wde9DgF_0IWXfT_95SHfcc';
// const ALL_PLEAD_ID = '18nv5m59ppoZLcjKXYziI-PLNx-dkr8i5Avn1ZnjaGiY';

const sheets = google.sheets({version: 'v4', auth: `${process.env.API_KEY}`});
sheets.spreadsheets.values.get({
  spreadsheetId: ALL_QUARTERS_ID,
  range: 'Fall 2016!A:X',
}).then((response) => formatResponse(response));

function formatResponse(response){
  const values = response.data.values;
  if (!values) return;
  fs.writeFileSync(path.resolve(__dirname, '../data/example.json'), JSON.stringify(values, null, 2));
}