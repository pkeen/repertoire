const mongoose = require('mongoose');

const setSchema = new Schema({
    // fk workoutExercise
    workoutExercise: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutExercise'
    },
    reps: Number,
    weight: Number
}, {
    timestamps: true,
    statics: {
        convertToKg(lbs) {
            return lbs * 0.45359237
        }
    }

});

module.exports = mongoose.model('Set', setSchema);