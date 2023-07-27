const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const Preference = require('../models/preference');

router.get('/preferences/:id', async (req, res) => {
    try {
        const preferences = await Preference.findById(req.params.id);
        await res.json(preferences);
    } catch (err) {
        console.log(err);
    }
});

// Update the preferences
router.put('/preferences/:id', async (req, res) => {
    console.log(req.body);
    try {
        const preference = await Preference.findById(req.params.id);
        Object.assign(preference, req.body);
        preference.save();
        // await res.json();
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;