const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets')

// GET


// POST
router.post('/workouts/:workoutId/exercises/:exerciseId/sets', setsCtrl.create)

module.exports = router;