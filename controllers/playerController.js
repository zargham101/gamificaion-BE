const Player = require('../models/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerPlayer = async (req, res) => {
  const { username, password } = req.body;

  const existingPlayer = await Player.findOne({ username });
  if (existingPlayer) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const player = new Player({
    username,
    password: hashedPassword,
  });

  try {
    await player.save();
    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      _id: player._id,
      username: player.username,
      score: player.score,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering player' });
  }
};


const loginPlayer = async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({ username });

  if (!player) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, player.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
};

module.exports = { registerPlayer, loginPlayer };
