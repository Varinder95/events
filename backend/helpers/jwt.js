const expressJwt = require('express-jwt');
const config = require('../config.js');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/getUserCount',
            '/events/getAllByUser',
            '/events/createEvent',
            '/events/getEventById',
            '/events/getAllPending',
            '/events/getAllFiltered',
            '/events/getEventCount',
            '/events/updateEvent',
            '/basic/contactSubmit',
            '/basic/subscribe',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
