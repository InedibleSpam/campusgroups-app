const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

//Handling for encrypting passwords and storing login data

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Email and password required' });

  let users = [];
  try {
    const fileData = fs.readFileSync(USERS_FILE, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  let users = [];
  try {
    const fileData = fs.readFileSync(USERS_FILE, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Server error reading user data' });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

// Endpoint to fetch all users
app.get('/api/users', (req, res) => {
  try {
    const fileData = fs.readFileSync(USERS_FILE, 'utf-8');
    const users = JSON.parse(fileData);
    res.json(users); // Send the users as JSON
  } catch (err) {
    console.error('Error reading users.json:', err);
    res.status(500).json({ message: 'Server error reading user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
