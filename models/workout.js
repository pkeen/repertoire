const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Set */
const setSchema = new Schema({
    // fk workoutExercise
    // workoutExercise: { //
    //     type: Schema.Types.ObjectId,
    //     ref: 'WorkoutExercise'
    // },
    reps: Number,
    weight: Number
}, {
    timestamps: true
});


/* Exercise */
const exerciseSchema = new Schema({
    // workout and exercise fks
    // workout: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Workout'
    // },
    exerciseData: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    sets: [setSchema]

}, {
    timestamps: true
});


/* Workout */
const workoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    date: Date,
    exercises: [exerciseSchema]
}, {
    timestamps: true,
    methods: {
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
           return formattedTime + ' ' + formattedDate; // "5:37 PM Wed, 9 July 2021"
        }
    }
});

// workoutSchema.methods.formatDateForDatetimeLocal = function() {
//     const date = this.date;
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-based, so +1 and pad with 0s
//     const day = date.getDate().toString().padStart(2, '0'); // pad with 0s
//     const hours = date.getHours().toString().padStart(2, '0'); // pad with 0s
//     const minutes = date.getMinutes().toString().padStart(2, '0'); // pad with 0s

//     // concatenate the parts into a datetime-local string format
//     return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
// };

module.exports = mongoose.model('Workout', workoutSchema);