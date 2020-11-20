// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-fetch';
import redis from "redis";
import { BASE_API_URL,STATE_LOOKUP,STATE_CODES,STATE_DATA_KEYS } from '../../../constants';

const client = redis.createClient();


client.on("connect", function() {
  console.log("Connected to Redis");
});

client.on("error", function(error) {
console.error(error);
});



const state = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
  res.status(500).send({ Error: 'Only get allowed' })
  const stateCode = req.query.id;
  res.statusCode = 200
  const stateData =  await new Promise((res) => {
     if (typeof stateCode === 'string')
       client.hgetall(STATE_LOOKUP[stateCode], (err, stateData) => {
         res(stateData);
      })
  });
  if (typeof stateCode === 'string')
  res.json({ stateData,a:STATE_LOOKUP[stateCode]})

}

// https://api.covid19india.org/v4/min/timeseries-MH.min.json

export default state;