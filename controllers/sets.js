const Workout = require('../models/workout');

const create = async (req, res) => {
    try {
        console.log('controller action found')
        const workout = await Workout.findById(req.params.workoutId);
        const exercise = await workout.exercises.id(req.params.exerciseId)
        await exercise.sets.push(req.body);
        await workout.save();
        res.redirect(`/workouts/${req.params.workoutId}`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    create
}