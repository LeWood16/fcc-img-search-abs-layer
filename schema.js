var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    when : {
        type: Date,
        required: true
    }
});

