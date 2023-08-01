const Workout = require('../models/workout');
const User = require('../models/user')
const isOwner = require('../config/isOwner')

const create = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        console.log(req.user);
        console.log(workout);
        if (!isOwner(req.user._id, workout)) {
            return res.status(401).json({message: "Unauthorized"}); // 401 is Unauthorized HTTP status code
        }
        if (req.user.preferences.measurement === 'imperial') {
            req.body.weight = Workout.convertToKg(req.body.weight);
        }
        // console.log('controller action found')
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
        if (!isOwner(req.user._id, workout)) {
            return res.status(401).json({message: "Unauthorized"}); // 401 is Unauthorized HTTP status code
        }
        const exercise = await workout.exercises.id(req.params.exerciseId);
        const set = await exercise.sets.id(req.params.id);
        await set.deleteOne();
        await workout.save();
        res.redirect(`/workouts/${req.params.workoutId}`);
    } catch (err) {
        console.log(err)
    }
}

// get most recent WIP
// const mostRecent = async (req, res) => {
//     try {
//         // const mostRecentExercise = await Workout.findMostRecentExerciseSet(req.user.id, req.params.exerciseId);
//         const recentSet = await Workout.findRecentSet(req.user._id, req.params.exerciseId);
        
//         console.log(recentSet);
//         res.json(recentSet);
//         // res.redirect(`/workouts/${req.params.workoutId}`)
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports = {
    create,
    delete: deleteSet,
    // mostRecent
}