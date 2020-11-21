import {  NextApiRequest } from 'next';


export type NextApiRequestWithMongo = NextApiRequest & {
    dbClient: any,
    db:any,
  }