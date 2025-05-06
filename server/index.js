const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

// Ensure users.json exists
(async () => {
  try {
    await fs.access(USERS_FILE);
  } catch (err) {
    await fs.writeFile(USERS_FILE, '[]');
  }
})();

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password required' });
  }

  let users = [];
  try {
    const fileData = await fs.readFile(USERS_FILE, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Server error reading user data' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Find max ID and increment
  const maxId = users.reduce((max, user) => Math.max(max, user.id || 0), 0);
  const newUser = {
    id: maxId + 1,
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user data' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  let users = [];
  try {
    const fileData = await fs.readFile(USERS_FILE, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Server error reading user data' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

// Get all users (name, email, and id only)
app.get('/api/users', async (req, res) => {
  try {
    const fileData = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(fileData);
    const safeUsers = users.map(({ id, name, email }) => ({ id, name, email }));
    res.json(safeUsers);
  } catch (err) {
    console.error('Error reading users.json:', err);
    res.status(500).json({ message: 'Server error reading user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
