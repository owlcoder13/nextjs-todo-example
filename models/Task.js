var mongoose = require('mongoose');

let ModelClass

try {
    ModelClass = mongoose.model('Task')
} catch (error) {

    const taskSchema = new mongoose.Schema({
        text: String,
        done: Boolean,
    });

    ModelClass = mongoose.model('Task', taskSchema)
}

module.exports = ModelClass;