const DEV = process.env.NODE_ENV === "development";

const fs = require("fs");
const request = require("request");
const notify = require("./notify.js");

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDate() {
  const today = new Date();
  const month = MONTHS[today.getUTCMonth()];
  const day = today.getUTCDate();
  const year = today.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

function getRelease(date) {
  return new Promise((resolve, reject) => {
    const url =
      "https://www.mass.gov/info-details/covid-19-cases-quarantine-and-monitoring";
    request(url, (err, response, body) => {
      if (err || response.statusCode !== 200) reject();
      else if (body) {
        const found = body.includes(date);
        if (found) fs.writeFileSync("latest.txt", date);
        resolve(found);
      } else reject();
    });
  });
}

async function init(date) {
  try {
    const newRelease = await getRelease(date);
    if (newRelease) notify({ subject: "COVID data release", text: date });
    process.exit();
  } catch (err) {
    const text = err.toString();
    if (DEV) console.log(text);
    else notify({ subject: "COVID data error", text });
  }
}

// kickoff
const latest = fs.readFileSync("latest.txt", "utf8");
const date = getDate();
if (date !== latest) init(date);
else process.exit();
