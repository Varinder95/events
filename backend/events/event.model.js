const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Name: { type: String, required: true },
    Sport: { type: String, required: true },
    Category: { type: String, required: true },
    entryFee: { type: String, required: true },
    Description: { type: String, required: true },
    createdById: { type: String, required: true },
    createdByFName: { type: String, required: true },
    createdByLName: { type: String, required: true },
    startDate: { type: String, required : true },
    endDate: { type: String, required: true },
    Time: { type: String, required: true },
    Address: { type: String, required: true },
    Landmark: { type: String, required: true },
    Location: { type: String, required: true },
    Rules: { type: String, required: true },
    Organiser1Name: { type: String, required: true },
    Organiser2Name: { type: String, required: true },
    Organiser1Phone: { type: String, required: true },
    Organiser2Phone: { type: String, required: true },
    Prize1: { type: String, default: 'No Prize' },
    Prize2: { type: String, default: 'No Prize' },
    Prize3: { type: String, default: 'No Prize' },
    consolationPrize: { type: String, default: 'No Prize' },
    approvalStatus: { type:String, default: 'Pending'},
    Featured: { type:String, default: 'No'},
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

module.exports = mongoose.model('Event', schema);
