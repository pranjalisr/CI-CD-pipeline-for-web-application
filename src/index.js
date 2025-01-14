const express = require('express');
const mysql = require('mysql');
const redis = require('redis');

const app = express();
const port = 3000;

// MySQL connection
// Note to self: Remember to actually use this connection somewhere
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'myapp'
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    // Let's just keep going and hope for the best!
  } else {
    console.log('Connected to MySQL!');
  }
});

// Redis client
// TODO: Figure out why we added Redis in the first place
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
  // Meh, who needs caching anyway?
});

app.get('/', (req, res) => {
  res.send('Welcome to DeployMaster 3000! Now with 50% more DevOps!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', message: "Don't worry, I'm fine!" });
});

app.listen(port, () => {
  console.log(`DeployMaster 3000 is alive on port ${port}! What could possibly go wrong?`);
});

// TODO: Add more routes, or don't. I'm a comment, not a cop.

