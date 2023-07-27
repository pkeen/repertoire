const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ExerciseData = require('../models/exerciseData');
const fs = require('fs');
const https = require('https');
const path = require('path');
const axios = require('axios');

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

const downloadGif = async (dir, i, url) => {


    const oneDirectoryUp = path.dirname(__dirname);
    const localDir = `${oneDirectoryUp}/public${dir}`
    const thisPath = `${localDir}/${i}.gif`;

    if (!fs.existsSync(localDir)){
        fs.mkdirSync(localDir, { recursive: true }); // The `recursive` option ensures that parent directories are created if they do not exist
    }

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const filePath = fs.createWriteStream(thisPath);
            res.pipe(filePath);
            filePath.on('finish', () => {
                filePath.close();
                resolve(`${dir}/${i}.gif`);
            })
            filePath.on('error', reject);
        }).on('error', reject);
    });


}

const seed = async () => {

    try {
        
        // // delete data (Uncomment to delete data)
        // console.log("deleting data already in collection...");
        // await ExerciseData.deleteMany({}) // delete all exercises

        // If collection already holds documents exit
        const exerciseCount = await ExerciseData.countDocuments({});
        if (exerciseCount === 0) {
            console.log('Adding data to collection...');
            // Fetch Exercises
            // const exerciseList = await fetch(endpoint, options).then(res => res.json());
            // Use Axios to get data from API
            const exerciseList = await axios.get(endpoint, options).then(res => res.data);
            // console.log(exerciseList);

            // iterate and create 

            // iterating next
            // exerciseList.forEach(async (e, i) => {
            //     delete e.id // delete the provided id
            //     e.gifUrl = await downloadGif('/images/exercises', i, e.gifUrl);
            //     await ExerciseData.create(e);
            // });

            // practise
            for (let i = 0; i < exerciseList.length; i++) {
                delete exerciseList[i].id;
                // exerciseList[i].gif = `/images/exercises/${i}.gif`
                exerciseList[i].gifUrl = await downloadGif('/images/exercises', i, exerciseList[i].gifUrl);
                const exercise = await ExerciseData.create(exerciseList[i]);
                // console.log(exercise.gifUrl)
                // await exercise.save();
                // await ExerciseData.create(exerciseList[i]);
            }

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
    await closeConnection();

}

main();