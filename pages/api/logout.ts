// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        'Set-Cookie',
        `pb_auth=deleted; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None`
    );
    res.status(200).send({});
}
