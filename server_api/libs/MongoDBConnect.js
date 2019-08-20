// const config = require('config')
const mongoose = require('mongoose');
require('dotenv').config()


let isConnectedBefore = false;

module.exports = () => {
    mongoose.connect(mongo_klb, {
        useNewUrlParser: true
    });
}

mongoose.connection.on('error', () => {
    console.error('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', () => {
    console.error('Lost MongoDB connection...');
    if (!isConnectedBefore)
        connect();
});
mongoose.connection.on('connected', () => {
    isConnectedBefore = true;
    console.error('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', () => {
    console.error('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.error('Force to close the MongoDB conection');
        process.exit(0);
    });
});