const express = require('express');
const Bull = require('bull');
// if running only redis on docker, use below
// const Queue = new Bull('emailQueue');
const redis = {
  host: 'redis', // Use the service name defined in Docker Compose
  port: 6379, // Redis port
}

// if redis and node are hosted on separate docker instance,
// you need to give the host and port number for it to access
const Queue = new Bull('emailQueue', {redis});

const app = express();

// Process the jobs in the queue (in this case, sending emails)
Queue.process(async job => {
  setTimeout(() => {
    // For demonstration purposes, we'll simulate sending an email
    console.log(`Processing job for sending email to: ${job.data.email}`);
  }, 10000);
});

// Endpoint to add jobs to the queue
app.get('/', async (req, res) => {
  for (let index = 0; index < 10; index++) {
    await Queue.add({ email: `${index}-demo@example.com` });
  }
  res.send('Email job added to the queue.');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
