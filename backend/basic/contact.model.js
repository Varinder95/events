const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Name: { type: String, required: true },
    Phone: { type: String, required: true },
    Subject: { type: String, required: true },
    Email: { type: String, required : true},
    Message: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Contact', schema);
