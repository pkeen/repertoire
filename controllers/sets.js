const Workout = require('../models/workout');
const User = require('../models/user')

const create = async (req, res) => {
    try {
        if (req.user.preferences.measurement === 'imperial') {
            req.body.weight = Workout.convertToKg(req.body.weight);
        }
        // console.log('controller action found')
        const workout = await Workout.findById(req.params.workoutId);
        const exercise = await workout.exercises.id(req.params.exerciseId)
        await exercise.sets.push(req.body);
        await workout.save();
        res.redirect(`/workouts/${req.params.workoutId}`)
    } catch (err) {
        console.log(err);
    }
}

const deleteSet = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        const exercise = await workout.exercises.id(req.params.exerciseId);
        const set = await exercise.sets.id(req.params.id);
        await set.deleteOne();
        await workout.save();
        res.redirect(`/workouts/${req.params.workoutId}`);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    create,
    delete: deleteSet
}