let Task = require('../../models/Task');

export default (req, res) => {
    let model = new Task({ text: req.body.text });
    //
    // res.status = 200;
    // res.json({ success: true});

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    res.end(JSON.stringify({ success: true, model}))
}