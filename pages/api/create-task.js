let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post(async (req, res) => {

    let model = new Task({
        text: req.body.text,
        done: false
    });

    await model.save();
    res.status(200).json({ success: true, model })
})

export default handler;