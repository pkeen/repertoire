const Workout = require('../models/workout');


const update = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        const exercise = await workout.exercises.id(req.params.id);
        exercise.exerciseData = req.body.exerciseData;
        await workout.save();
        res.redirect(`/workouts/${workout.id}`);
    } catch (err) {
        console.log(err);
    }
}

const deleteExercise = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        await workout.exercises.id(req.params.id).deleteOne();
        await workout.save();
        res.redirect(`/workouts/${workout.id}`);
    } catch (err) {
        console.log(err)
    }
}

const create = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        await workout.exercises.push(req.body);
        workout.save();
        res.redirect(`/workouts/${workout.id}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    update,
    delete: deleteExercise,
    create
}