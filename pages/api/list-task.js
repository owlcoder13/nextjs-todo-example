let Task = require('../../models/Task');
import nextConnect from 'next-connect';
import database from '../../models/connection';

const handler = nextConnect();

handler.use(database)

handler.get(async (req, res) => {
    let model = await Task.find({}).sort('order_num');
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, model }))
});

export default handler;