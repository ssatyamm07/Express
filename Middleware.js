// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mock user data (replace with database integration)
const users = [];

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

    // Create user object
    const user = {
      userFname: req.body.userFname,
      userType: req.body.userType,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword
    };

    // Add user to the database
    users.push(user);

    // Respond with success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    // Find user by email
    const user = users.find(u => u.userEmail === req.body.userEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    if (await bcrypt.compare(req.body.userPassword, user.userPassword)) {
      // Generate JWT token
      const token = jwt.sign({ userEmail: user.userEmail }, JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protect route with authentication middleware
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Verify token
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
