const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/progress', require('./routes/progress'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});