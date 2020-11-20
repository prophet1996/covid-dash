const redis = require("redis");
const client = redis.createClient();


client.on("connect", function() {
    console.log("You are now connected");
});
  
client.on("error", function(error) {
  console.error(error);
});

client.set("key", "value");
client.get("key", (err,v) => { console.log(v); });
