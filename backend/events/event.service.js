const config = require('../config.js');
const db = require('../helpers/db');
const Event = db.Event;

module.exports = {
    getAllByUser,
    createEvent,
    getEventById
};

// get event by id
async function getEventById(eventId) {
console.log(eventId)
    const event = await Event.findOne({ _id : eventId });
    if (event) {
        return {
            ...event.toJSON()
        };
    }
}

async function createEvent(eventParam) {
    console.log(eventParam);
    const event = new Event(eventParam);
// save user
    await event.save();
}

// get events posted by a user
async function getAllByUser(userId) {
console.log(userId)
    return await Event.find( { createdById: userId } );
}
