const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET most recent
// WIP
// router.get('/workouts/:workoutId/exercises/:exerciseId/sets/recent', setsCtrl.mostRecent);

// POST
router.post('/workouts/:workoutId/exercises/:exerciseId/sets', ensureLoggedIn, setsCtrl.create)

// DELETE
router.delete('/workouts/:workoutId/exercises/:exerciseId/sets/:id', ensureLoggedIn, setsCtrl.delete)

module.exports = router;