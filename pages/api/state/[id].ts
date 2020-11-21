// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {  NextApiResponse } from 'next';
import redis from "redis";
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import { NextApiRequestWithMongo } from '../../../types';


const client = redis.createClient();

client.on("connect", function() {
  console.log("Connected to Redis");
});

client.on("error", function(error) {
console.error(error);
});


const handler = nextConnect();

handler.use(middleware);



handler.get(async (req: NextApiRequestWithMongo, res: NextApiResponse) => {
  const stateCode = req.query.id;
  res.statusCode = 200
  let stateData: any = {};
  await new Promise((res, rej) => {
    if (typeof stateCode === 'string') {
      client.hgetall(stateCode, (err, stateTotal) => {
        if (err) rej(err);
        stateData.total = stateTotal;
        res(stateData);
      });
    }
    
  });
  stateData = await req.db.collection('state').findOne({name:stateCode})
  if (typeof stateCode === 'string')
    res.json({ stateData })

}
);

// https://api.covid19india.org/v4/min/timeseries-MH.min.json

export default handler;