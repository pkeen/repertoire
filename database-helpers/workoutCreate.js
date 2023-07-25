const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workout = require('../models/workout');

dotenv.config();

// Request parameters
const endpoint = 'https://exercisedb.p.rapidapi.com/exercises';

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1a41e5d857msh7fd4eeb01ede792p1c37cdjsn9979da6f6e94',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

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

const createWorkouts = async () => {
    try {
        await Workout.create({
            title: "Upper Body Workout 1",
            date: new Date()
        })
    } catch (err) {
        console.log(err);
    }
}

const closeConnection = async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
}

const main = async () => {
    connectDatabase();
    await createWorkouts();
    await closeConnection();
}

main();
