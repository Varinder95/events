const config = require('../config.js');
const db = require('../helpers/db');
const Contact = db.Contact;
const MailList = db.MailList;

module.exports = {
    contactSubmit,
    subscribe,
};


async function contactSubmit(contactParam) {
    console.log(contactParam);
    const contact = new Contact(contactParam);
// save user
    await contact.save();
    return {
            ...contact.toJSON(),
        };
}

async function subscribe(subscribeParam) {
    console.log(subscribeParam);
    const mailList = new MailList(subscribeParam);
// save user
    await mailList.save();
    return {
            ...mailList.toJSON(),
        };
}
