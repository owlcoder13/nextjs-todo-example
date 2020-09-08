let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post((req, res) => {

    let model = new Task({
        text: req.body.text,
        done: false
    });

    model.save(function (err) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true, model }))
    });
})

export default handler;