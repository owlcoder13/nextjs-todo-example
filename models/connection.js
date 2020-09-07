const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-nextjs', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


export default async function database(req, res, next) {
    let promise = new Promise(r => {
        db.once('open', function () {
            r(true);
        });
    })

    await promise;

    return next();
}