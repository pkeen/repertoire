const Workout = require('../models/workout');
const ExerciseData = require('../models/exerciseData');
// const WorkoutExercise = require('../models/workoutExercise');

const index = async (req, res) => {
    // Currently shows all make show user
    const user = req.user;
    const newWorkout = new Workout();
    console.log(`user: ${user}`);
    const workouts = await Workout.find({user: user.id})
        .populate({
            path: 'exercises',
            populate: {
                path: 'exerciseData',
                model: 'ExerciseData'
            }
        })
        .populate({
            path: 'exercises',
            populate: {
                path: 'sets'
            }
        })
        .sort({date: 'desc'})
    res.render('workouts/index', {
        title: "Workouts",
        workouts,
        defaultDate: newWorkout.formatDateForDatetimeLocal()
    });
}

const newWorkout = (req, res) => {
    const newWorkout = new Workout();
    res.render('workouts/new', {
        title: "new workout",
        defaultDate: newWorkout.formatDateForDatetimeLocal()
    });
}

const create = async (req, res) => {
    // create new workout
    const user = req.user;
    // console.log(user);
    Object.assign(req.body, {user: user._id});
    console.log(req.body);
    try {
        await Workout.create(req.body);
        res.redirect('/workouts');
    } catch (err) {
        console.log(err);
    }
}

const edit = async ( req , res ) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.render('workouts/edit', {
            title: workout.title,
            workout
        });
    } catch (err) {
        console.log(err);
    }
}

const show = async ( req, res ) => {
    try {
        const workout = await Workout.findById(req.params.id)
            .populate({
                path: 'exercises',
                populate: {
                    path: 'exerciseData',
                    model: 'ExerciseData'
                }
            });
        const targets = await ExerciseData.getTargetOptions();
        const bodyParts = await ExerciseData.getBodyPartOptions();
        const equipment = await ExerciseData.getEquipmentOptions();
        const exerciseData = await ExerciseData.find({});
        // most recent workout
        // const mostRecentExerciseSet = await Workout.findMostRecentExerciseSet(req.user.id);
        // console.log(mostRecentExerciseSet);

        res.render('workouts/show', {
            title: workout.title,
            workout,
            targets,
            bodyParts,
            equipment,
            exerciseData
        }); 
    } catch (err) {
        console.log(err)
    }
}

const update = async (req, res) => {
    try {
        await Workout.findByIdAndUpdate(req.params.id, req.body);
        console.log(await Workout.findById(req.params.id));
        res.redirect(`/workouts/${req.params.id}`);
    } catch {
        console.log(err)
    }
}

const deleteWorkout = async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/workouts');
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    index, 
    create,
    new: newWorkout, 
    edit,
    show, 
    update,
    delete: deleteWorkout
}