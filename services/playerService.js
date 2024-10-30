const Player = require('../models/player');

const registerPlayer = async (username, password) => {
  const player = new Player({ username, password });
  return await player.save();
};

module.exports = { registerPlayer };
