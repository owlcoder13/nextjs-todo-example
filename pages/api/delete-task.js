let Task = require('../../models/Task');

import getHandler from '../../lib/getHandler';

let handler = getHandler();

handler.post(async (req, res) => {
    Task.deleteOne({ _id: req.body._id }, function (err, result) {
        if (err) return console.log(err);

        console.log('here result', req.body);
        res.status(200).json({ success: true });
    })
})

export default handler;