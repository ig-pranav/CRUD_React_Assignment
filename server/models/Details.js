const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    age: {
        type: 'number',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
    },
    phoneNumber: {
        type: 'number',
        required: true,
    },
});

module.exports = mongoose.model('Employee', employeeSchema);