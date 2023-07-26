const WoExercise = require('../models/workoutExercise');
const ExerciseData = require('../models/exerciseData')
const Workout = require('../models/workout')

const newWoExercise = async (req, res) => {
    const { target } = req.query;
    const query = {}
    if (target) {
        query.target = target
    }
    const workoutId = req.params.workoutId;
    try {
        const exerciseData = await ExerciseData.find(query);
        const targets = await ExerciseData.getTargetOptions();
        res.render('woExercise/new', {
            title: 'New Exercise',
            workoutId,
            exerciseData,
            targets
        });
    } catch (err) {
        console.log(err);
    }
    // console.log(targets);
}

const create = async (req, res) => {
    try {
        const workoutId = req.params.workoutId;
        const workout = await Workout.findById(req.params.workoutId)
        // woExercise.user = req.user;
        await workout.exercises.push(req.body);
        await workout.save();
        res.redirect(`/workouts/${workoutId}`);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    create,
    new: newWoExercise
}

