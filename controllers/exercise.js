const Workout = require('../models/workout');


const update = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        const exercise = workout.exercises.id(req.params.id);
        // console.log(exercise)
        // console.log(req.body.exerciseData);
        exercise.exerciseData = req.body.exerciseData;
        await workout.save();
        res.redirect(`/workouts/${workout.id}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    update
}