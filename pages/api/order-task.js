let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post(async (req, res) => {
    for (let item of req.body) {
        let model = await Task.findById(item._id);
        model.order_num = item.index;
        await model.save();

        console.log(model)
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true }))
})

export default handler;