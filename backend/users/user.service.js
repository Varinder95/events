const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    create,
    getById
};

async function authenticate({ Email, password }) {
    const user = await User.findOne({ Email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    console.log(userParam);
// validate
    if (await User.findOne({ Email: userParam.Email })) {
        throw 'Email "' + userParam.Email + '" is already registered';
    }
    const user = new User(userParam);
// hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
// save user
    await user.save();
    return {
            ...user.toJSON(),
        };
}

// get user by id
async function getById(id) {
    return await User.findById(id);
}
