const express = require('express');
const router = express.Router();
const workoutsCtlr = require('../controllers/workouts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// Workouts index
router.get('/', ensureLoggedIn, workoutsCtlr.index);

// new 
router.get('/new', ensureLoggedIn, workoutsCtlr.new);

// edit
router.get('/:id/edit', ensureLoggedIn, workoutsCtlr.edit);

// show 
router.get('/:id', ensureLoggedIn, workoutsCtlr.show)

// Patch update
router.put('/:id', ensureLoggedIn, workoutsCtlr.update);

// POST
router.post('/', ensureLoggedIn, workoutsCtlr.create);




module.exports = router;