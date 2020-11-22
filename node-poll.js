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
}, (err,client) => {
        if (!err) {
            client.createCollection('timeseries');
            client.createCollection('state');
        }
});


const rule = new schedule.RecurrenceRule();
rule.second = 1;

const j = schedule.scheduleJob(rule, async () => {
    const response = fetch('https://api.covid19india.org/v4/min/data.min.json');
    const data = await (await response).json();
    const stateArray = Object.keys(data);
    const mongoData = [];
    const mongoTimeSeriesData = [];
    if (!mongoClient.isConnected()) await mongoClient.connect();
    const db = mongoClient.db('MCT');
    for (let i = 0; i < stateArray.length; i++) {
        if (data[stateArray[i]]) {
            client.hmset(stateArray[i], data[stateArray[i]].total);
            // client.hgetall(stateArray[i], (err, obj) => {
                // console.log('1', obj)
            // });
            mongoData.push({ ...data[stateArray[i]], districts: undefined, name: stateArray[i] });
            //if() in redis cache dont add
            {
                try {
                    const timeSeriesData = await (await fetch(`https://api.covid19india.org/v4/min/timeseries-${stateArray[i]}.min.json`)).json();
                    // db.collection('timeseries').drop();
                    mongoTimeSeriesData.push({ dates:timeSeriesData[stateArray[i]].dates,name:stateArray[i] });
                        
                } catch (err) {
                    console.log(err);
                }
                
             }
        }
    }
    if (stateArray.length > 0) {
        db.collection('state').drop();
        db.collection('state').insertMany(mongoData);     
        db.collection("timeseries").insertMany(mongoTimeSeriesData);
        
    }
    

});


/*
STATE_DATA_KEYS.forEach(key=>client.hmget(key, function(obj) {
    console.log(obj);
}));


*/