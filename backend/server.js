const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./User');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FA2Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password, emoji } = req.body;
  console.log('Registration attempt:', { username, password, emoji });
  if (!username || !password || !emoji) {
    console.log('Registration failed: Missing fields');
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Registration failed: Username exists');
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, emoji });
    await user.save();
    console.log('Registered user:', { username, emoji });
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password, emoji } = req.body;
  console.log('Login attempt:', { username, password, emoji });
  if (!username || !password || !emoji) {
    console.log('Login failed: Missing fields');
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || emoji !== user.emoji) {
      console.log('Login failed: Invalid password or emoji');
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    console.log('Login successful');
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));