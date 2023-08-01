const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Set */
const setSchema = new Schema({

    reps: Number,
    weight: Number
}, {
    timestamps: true,
    methods: {
        getWeight(measurement) {
            return measurement === 'metric' ? `${this.weight} kg` : `${Math.round((this.weight * 2.20462) * 100) / 100} lbs`;
        }
    }
});


/* Exercise */
const exerciseSchema = new Schema({
    exerciseData: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    sets: [setSchema]

}, {
    timestamps: true,
});


/* Workout */
const workoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    exercises: [exerciseSchema]
}, {
    timestamps: true,
    methods: {
        formatWorkoutName() {
            const title = this.title ? this.title : 'Workout';
            const date = this.formatDate();
            return `${title} @ ${date}`
        },
        formatDateForDatetimeLocal() {
            const date = this.date;
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-based, so +1 and pad with 0s
            const day = date.getDate().toString().padStart(2, '0'); // pad with 0s
            const hours = date.getHours().toString().padStart(2, '0'); // pad with 0s
            const minutes = date.getMinutes().toString().padStart(2, '0'); // pad with 0s

            // concatenate the parts into a datetime-local string format
            return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
        },
        formatDate() {
            const date = this.date; // current date and time
            const formattedTime = date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true
            });
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
           return formattedTime + ' on ' + formattedDate; // "5:37 PM Wed, 9 July 2021"
        },
        
    },
    statics: {
        convertToKg(lbs) {
            return lbs * 0.45359237
        },
        findMostRecentExerciseSet(userId, exerciseId) {
            const mostRecentWorkout = this.findOne({user: userId, exercise: exerciseId}).sort('-createdAt');
            return mostRecentWorkout;
        },
        // find last set to populate field WIP
        // findRecentSet(userId, exerciseId) {
        //     return this.aggregate([
        //         { $match: {user: userId} },
        //         { $unwind: "$exercises" }, 
        //         { $match: { "exercises._id": exerciseId } },
        //         { $unwind: "$exercise.sets" },
        //         { $sort: {"exercises.sets.createdAt": -1} },
        //         { $limit: 1}
        //     ]).exec() 
        //         // handle error and use docs
        // }
    }
});


module.exports = mongoose.model('Workout', workoutSchema);