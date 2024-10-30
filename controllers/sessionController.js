const Session = require('../models/session');
const Player = require('../models/player');

const createSession = async (req, res) => {
  const { name, duration } = req.body;
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + duration * 60000); // Duration in minutes

  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // Unique session ID

  const session = new Session({
    sessionId,
    name,
    startTime,
    endTime,
    players: [],
    status: 'active',
  });

  try {
    await session.save();
    return res.status(201).json({
      sessionId: session.sessionId, // Include the session ID in the response
      name: session.name,
      startTime: session.startTime,
      endTime: session.endTime,
      status: session.status,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating session' });
  }
};

const joinSession = async (req, res) => {
  const { sessionId } = req.body;
  const playerId = req.userId; // Get player ID from the JWT token

  try {
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.players.includes(playerId)) {
      return res.status(400).json({ message: 'Player already joined this session' });
    }

    session.players.push(playerId);
    await session.save();
    
    const player = await Player.findById(playerId);

    return res.status(200).json({
      message: 'Player joined the session successfully.',
      sessionId: session.sessionId,
      player: {
        _id: player._id,
        username: player.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error joining session' });
  }
};


const endSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findOne({ sessionId });
    if (!session || session.status === 'ended') {
      return res.status(404).json({ message: 'Session not found or already ended' });
    }

    session.status = 'ended';
    await session.save();

    const players = await Player.find({ _id: { $in: session.players } }).sort({ score: -1 }).limit(1);
    const winner = players[0] || null;

    return res.status(200).json({
      winner: winner ? { _id: winner._id, username: winner.username } : null,
      message: 'Session ended. Winner announced.',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error ending session' });
  }
};

module.exports = { createSession, joinSession, endSession };
