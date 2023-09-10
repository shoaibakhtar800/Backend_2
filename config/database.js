const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnection;