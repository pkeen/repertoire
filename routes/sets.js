const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET


// POST
router.post('/workouts/:workoutId/exercises/:exerciseId/sets', ensureLoggedIn, setsCtrl.create)

module.exports = router;