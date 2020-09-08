let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post(async (req, res) => {
    let model = await Task.findById(req.query._id);

    for (var field of ['text', 'done']) {
        model[field] = req.body[field]
    }

    await model.save();

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, model }))

    // model.save(function (err) {
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'application/json')
    //     res.end(JSON.stringify({ success: true, model }))
    // });
})

export default handler;