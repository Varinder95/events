const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    DOB: { type: String, required: true },
    Gender: { type: String, required: true },
    FName: { type: String, required: true },
    hash: { type: String, required: true },
    Email: { type: String, unique : true, required : true, dropDups: true },
    PrefferedSport: { type: String, required: true },
    prefferedLocation: { type: String, required: true },
    Status: { type:String, default: 'User'},
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

module.exports = mongoose.model('User', schema);