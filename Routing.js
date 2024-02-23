const express = require("express");
const app = express();

// Improved authentication middleware with error handling
function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!username || !password) { // Check for missing credentials
    return res.status(400).json({ msg: "Missing username or password" });
  }

  if (username !== "harkirat" || password !== "pass") {
    return res.status(403).json({ msg: "Invalid username or password" });
  }

  next();
}

// Improved middleware for kidney and heart checkups with validation
function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;

  if (!kidneyId) { // Check for missing kidneyId
    return res.status(400).json({ msg: "Missing kidneyId" });
  }

  if (kidneyId !== '1' && kidneyId !== '2') {
    return res.status(400).json({ msg: "Invalid kidneyId" });
  }

  next();
}

function heartMiddleware(req, res, next) {
  const heartId = req.query.heartId;

  if (!heartId) { // Check for missing heartId
    return res.status(400).json({ msg: "Missing heartId" });
  }

  if (heartId !== '1' && heartId !== '2') {
    return res.status(400).json({ msg: "Invalid heartId" });
  }

  next();
}

// Routes with improved responses and error handling
app.get("/Uservalidation", userMiddleware, (req, res) => {
  res.json({ msg: "Welcome to Hospital, authorized user!" });
});

app.get("/kidneycheckup", userMiddleware, kidneyMiddleware, (req, res) => {
  const kidneyId = req.query.kidneyId;
  res.json({ msg: `Your kidney ${kidneyId} is good, no worry!` });
});

app.get("/heartcheckup", userMiddleware, heartMiddleware, (req, res) => {
  const heartId = req.query.heartId;
  res.json({ msg: `Your heart ${heartId} is good, no worry!` });
});

// Start the server with error handling
app.listen(5000, () => {
  console.log("Server is running on port 5000");
})
.on("error", (error) => {
  console.error("Server error:", error);
});