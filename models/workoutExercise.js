// should I have them seperate and referenced or embedded subdocuments?
// I'm thinking the reason to go with seperate collections and referencing is for querying most recent later

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutExerciseSchema = new Schema({
    // workout and exercise fks
    workout: {
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("WorkoutExercise", workoutExerciseSchema);


