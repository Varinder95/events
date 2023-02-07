const config = require('../config.js');
const db = require('../helpers/db');
const Event = db.Event;

module.exports = {
    getAllByUser,
    createEvent,
    getEventById,
    getAllPending,
    getAllFiltered,
    getEventCount,
    updateEvent
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
    return {
            ...event.toJSON(),
        };
}

// get events posted by a user
async function getAllByUser(userId) {
console.log(userId)
    return await Event.find( { createdById: userId } );
}


// get pending eventsr
async function getAllPending() {
    return await Event.find( { approvalStatus: 'Pending' } );
}

// get filtered events
async function getAllFiltered(query) {
    return await Event.find( query );
}

// get event count
async function getEventCount(query) {
    const eventCount = await Event.countDocuments(query);
    //console.log(eventCount);
    
    return {'EventCount' : eventCount};
}

// update event
async function updateEvent(query) {
console.log(query)
    const event = Event.updateOne( { _id : query.Id }, { $set: query.query } );
    
    return event;
}
