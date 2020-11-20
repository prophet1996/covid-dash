// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest,NextApiResponse } from 'next';

const state = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
  res.status(500).send({ Error: 'Only get allowed' })
  console.log('req', req.query)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}


export default state;