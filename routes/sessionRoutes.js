const express = require('express');
const router = express.Router();
const { createSession, joinSession, endSession } = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createSession);
router.post('/join', authMiddleware, joinSession);
router.post('/end/:sessionId', authMiddleware, endSession);

module.exports = router;
