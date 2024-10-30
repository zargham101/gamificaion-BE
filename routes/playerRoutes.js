const express = require('express');
const router = express.Router();
const { registerPlayer, loginPlayer } = require('../controllers/playerController');

router.post('/register', registerPlayer);
router.post('/login', loginPlayer); // Added for login

module.exports = router;
