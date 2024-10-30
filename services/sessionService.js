const Session = require("../models/session");
const Player = require("../models/player");

const createSession = async (sessionId) => {
  const session = new Session({ sessionId });
  return await session.save();
};

const endSession = async (sessionId, winnerId) => {
  return await Session.findOneAndUpdate(
    { sessionId },
    { isActive: false, winner: winnerId },
    { new: true }
  );
};

const calculateWinner = async (sessionId) => {
  const session = await Session.findOne({ sessionId }).populate("players");
  if (!session) throw new Error("Session not found");

  // Example logic: Select the player with the highest score
  const winner = session.players.reduce((topPlayer, player) => {
    return player.score > topPlayer.score ? player : topPlayer;
  }, session.players[0]);

  return winner;
};

module.exports = { createSession, endSession, calculateWinner };
