const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ExerciseData = require('../models/exerciseData');

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

const closeConnection = async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
}

const seed = async () => {

    try {
        
        // // delete data (Uncomment to delete data)
        // console.log("deleting data already in collection...");
        // await Exercise.deleteMany({}) // delete all exercises

        // If collection already holds documents exit
        const exerciseCount = await ExerciseData.countDocuments({});
        if (exerciseCount === 0) {
            console.log('Adding data to collection...');
            // Fetch Exercises
            const exerciseList = await fetch(endpoint, options).then(res => res.json());
            // console.log(exerciseList);
            const exercisePromises = exerciseList.map(exercise => {
                ExerciseData.create(exercise);
            });

            await Promise.all(exercisePromises);

            console.log(await ExerciseData.find({}));

        } else {
            console.log("No data added to collection")
            return;
        };

        
    } catch (error) {
        console.log(error);
    }
}

const main = async () => {

    connectDatabase();
    await seed();
    // await closeConnection();

}

main();