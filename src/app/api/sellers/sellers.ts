import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

export default async function sellers(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const { data: sellers, error } = await supabase.from('sellers').select('*');
                if (error) {
                    throw error;
                }
                res.status(200).json(sellers);
            } catch (err) {
                res.status(500).json({ error: 'Unable to fetch sellers', details: err.message });
            }
            break;

        case 'POST':
            try {
                const { name, email } = req.body;
                if (!name || !email) {
                    return res.status(400).json({ error: 'Name and email are required' });
                }

                const { data, error } = await supabase.from('sellers').insert([{ name, email }]);
                if (error) {
                    throw error;
                }
                res.status(201).json(data);
            } catch (err) {
                res.status(500).json({ error: 'Unable to create seller', details: err.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ error: `Method ${method} not allowed` });
            break;
    }
}