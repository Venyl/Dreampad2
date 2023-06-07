// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    res.setHeader(
        'Set-Cookie',
        `pb_auth=${body}; Path=/; Max-Age=600000; HttpOnly; Secure; SameSite=None`
    );
    res.status(200).send({});
}
