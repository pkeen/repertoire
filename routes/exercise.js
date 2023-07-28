const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercise');

// PUT
router.put('/workouts/:workoutId/exercises/:id', exercisesCtrl.update);
// router.put('/workouts/:workoutId/exercises/:id', (req, res) => {
//     console.log('found');
// } );

// // GET new
// router.get('/workouts/:workoutId/exercises/new', woExerciseCtlr.new)

// // POST
// router.post('/workouts/:workoutId/exercises', woExerciseCtlr.create);

module.exports = router;