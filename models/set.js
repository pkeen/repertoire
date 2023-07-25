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
    timestamps: true
});

module.exports = mongoose.model('Set', setSchema);