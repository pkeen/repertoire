const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workout = require('../models/workout');

dotenv.config();

const connectDatabase = () => {

    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;

    db.on('connected', () => {
        console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
    });
    db.on('error', (error) => {
        console.log(error)
    });
}

const closeConnection = async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
}

const clear = async () => {
    try {
        await Workout.deleteMany({});
        console.log('all workouts deleted');
    } catch (err) {
        console.log(err);
    }
}

const main = async () => {
    connectDatabase();
    await clear();
    await closeConnection();
}

main();