// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  email_address: string;
  first_name: string;
  last_name: string;
  offer: {
    amount: number;
    apr: number;
    terms: number;
    estimated_payments: number;
    payment_frequency: string;
    expires_at: string;
    is_expired: boolean;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    email_address: 'tester.macTester@gmail.com',
    first_name: 'Muck',
    last_name: 'Tester',
    offer: {
      amount: 35000,
      apr: 1,
      terms: 1,
      estimated_payments: 108.759,
      payment_frequency: 'bi-weekly',
      expires_at: '2022-06-14T07:21:39.000Z',
      is_expired: false
    }
  });
}
