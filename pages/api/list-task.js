let Task = require('../../models/Task');
import nextConnect from 'next-connect';
import database from '../../models/connection';

const handler = nextConnect();

handler.use(database)

handler.get((req, res, next) => {
    let result = Task.find({}, function (err, model) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true, model }))
    });
});

export default handler;

// export default async (req, res) => {
//
//     // console.log('just get there', Task)
//     // console.log('run here')
//     let result = Task.find({}, function(){
//         console.log('trigger callback')
//     });
//     // console.log(result)
//
//     // console.log(Task.find({}, function (err, model) {
//     //
//     //     if (err) return console.error(err);
//     //
//     //     res.statusCode = 200
//     //     res.setHeader('Content-Type', 'application/json')
//     //     res.end(JSON.stringify({ success: true, model }))
//     // }));
// }