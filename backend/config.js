const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    connectionString: process.env.Mongo_URL,
    secret: process.env.JWT_Secret
};