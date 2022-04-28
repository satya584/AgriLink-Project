const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const Schema = mongoose.Schema

const reportSchema = new Schema({

    cmdtyName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required: true
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: [true, 'Market name should be there']
    },
    users: {
        type: [String],
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    priceUnit: {
        type: String,
        default: 'Kg',
    },
    price: {
        type: Number,
        required: true
    },
    avgNumber: {
        type: Number,
        default: 1,
        expose: false
    }

})

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;