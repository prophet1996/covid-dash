var schedule = require('node-schedule');
const { createImportSpecifier } = require('typescript');
require('isomorphic-fetch');
const redis = require("redis");
const client = redis.createClient();


client.on("connect", function() {
    console.log("Connected to Redis");
});
  
client.on("error", function(error) {
  console.error(error);
});


const rule = new schedule.RecurrenceRule();
rule.second = 1;
 
var j = schedule.scheduleJob(rule, async () =>{
    console.log('The answer to life, the universe, and everything!');
    const response = fetch('https://api.covid19india.org/v4/min/data.min.json');
    const data = await (await response).json();
    console.log('data:', data);
    const stateArray = Object.keys(data);
    for (let i = 0; i < stateArray.length; i++){
        console.log(`adding ${stateArray[i]}`);
        client.hmset(stateArray[i], data[stateArray[i]]);
    }
});