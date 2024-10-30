const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const dotenv = require('dotenv');
const connectDb = require('./config/db')

dotenv.config();
const app = express();

app.use(express.json());

connectDb();

app.use('/api/players', playerRoutes);
app.use('/api/sessions', sessionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
