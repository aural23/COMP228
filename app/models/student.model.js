const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: String,
    age: Number,
    major: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', todoSchema);