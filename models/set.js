const mongoose = require('mongoose');

const setSchema = new mongoose.Schema ({
    // exerciseId: reference
    // workoutId: reference
    reps: Number,
    weight: Number
});

// module.exports = mongoose.model('Set', setSchema);