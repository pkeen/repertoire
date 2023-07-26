const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
// this could be a users router??

// router.put('/')
// GET User Profile 
    // stretch make profiles private or public
router.get('/:id', usersCtrl.show);

module.exports = router;