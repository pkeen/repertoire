const express = require('express');
const router = express.Router();
const ExerciseData = require('../models/exerciseData');

router.get('/search', async (req, res) => {
    const { target, equipment } = req.query;
    const query = {}
    if (target) {
        query.target = target
    }
    if (equipment) {
        query.equipment = equipment
    }
    try {
        const exerciseData = await ExerciseData.find(query);
        res.json(exerciseData);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router