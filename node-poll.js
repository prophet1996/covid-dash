var schedule = require('node-schedule');
require('isomorphic-fetch');
const redis = require("redis");
const client = redis.createClient();
const { MongoClient } = require('mongodb');

client.on("connect", function () {
    console.log("Connected to Redis");
});

client.on("error", function (error) {
    console.error(error);
});


const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const rule = new schedule.RecurrenceRule();
rule.second = 1;

const j = schedule.scheduleJob(rule, async () => {
    const response = fetch('https://api.covid19india.org/v4/min/data.min.json');
    const data = await (await response).json();
    const stateArray = Object.keys(data);
    const mongoData = [];
    for (let i = 0; i < stateArray.length; i++) {
        if (data[stateArray[i]]) {
            // console.log(`adding ${stateArray[i]} as ${JSON.stringify(data[stateArray[i]].total)}`);
            client.hmset(stateArray[i], data[stateArray[i]].total);
            client.hgetall(stateArray[i], (err, obj) => {
                console.log('1', obj)
            });
            mongoData.push({ ...data[stateArray[i]], districts: undefined, name: stateArray[i] });
        }
    }
    if (!mongoClient.isConnected()) await mongoClient.connect();
    const db = mongoClient.db('MCT');
    db.collection('state').insertMany(mongoData);

});


/*
STATE_DATA_KEYS.forEach(key=>client.hmget(key, function(obj) {
    console.log(obj);
}));


*/