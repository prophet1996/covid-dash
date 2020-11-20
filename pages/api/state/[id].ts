// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest,NextApiResponse } from 'next';
import { BASE_API_URL } from '../../../constants';
const state = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
  res.status(500).send({ Error: 'Only get allowed' })
  console.log('req', req.query)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}

// https://api.covid19india.org/v4/min/timeseries-MH.min.json

export default state;