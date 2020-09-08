const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-nextjs', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


export default async function database(req, res, next) {
    try {
        let connection = await db.once('open', (event) => {
            console.log('connected')
        });
    } catch (err) {
        console.log(err);
    }

    return next();

}