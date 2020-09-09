let Task = require('../../models/Task');
import nextConnect from 'next-connect';
import database from '../../models/connection';

const handler = nextConnect();

handler.use(database)

handler.get(async (req, res) => {
    let model = await Task.find({}).sort('order_num');
    res.status(200).json({ success: true, model })
});

export default handler;