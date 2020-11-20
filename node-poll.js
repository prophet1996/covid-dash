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
rule.minute= 5;
 
var j = schedule.scheduleJob(rule, async () =>{
    const response = fetch('https://api.covid19india.org/v4/min/data.min.json');
    const data = await (await response).json();
    const stateArray = Object.keys(data);
    for (let i = 0; i < stateArray.length; i++){
        if (data[stateArray[i]]) {
            // console.log(`adding ${stateArray[i]} as ${JSON.stringify(data[stateArray[i]].total)}`);
            client.hmset(stateArray[i], data[stateArray[i]].total);
        }
    }
});


/*
STATE_DATA_KEYS.forEach(key=>client.hmget(key, function(obj) {
    console.log(obj);
}));


*/