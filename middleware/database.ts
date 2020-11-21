import {  NextApiResponse,NextApiHandler } from 'next';
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import { NextApiRequestWithMongo } from '../types';

const client = new MongoClient('mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req:NextApiRequestWithMongo, res:NextApiResponse, next): Promise<any> {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('MCT');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;