let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post(async (req, res) => {
    let model = await Task.findById(req.query._id);

    ['text', 'done'].forEach(field => {
        model[field] = req.body[field]
    })

    await model.save();

    res.status(200).json({ success: true, model })
})

export default handler;