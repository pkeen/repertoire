const express = require('express');
const router = express.Router();
const woExerciseCtlr = require('../controllers/woExercise');

// GET new
router.get('/workouts/:workoutId/exercises/new', woExerciseCtlr.new)

// POST
router.post('/workouts/:workoutId/exercises', woExerciseCtlr.create);

module.exports = router;