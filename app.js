const express = require('express');
const Bull = require('bull');
// if running only redis on docker, use below
// const Queue = new Bull('emailQueue');

// if redis and node are hosted on separate docker instance,
// you need to give the host and port number for it to access
const Queue = new Bull('emailQueue', {
  redis: {
    host: 'redis', // Use the service name defined in Docker Compose
    port: 6379, // Redis port
  },
});


const app = express();

// Process the jobs in the queue (in this case, sending emails)
Queue.process(async job => {
  setTimeout(() => {
    console.log(`Processing job for sending email to: ${job.data.email}`);
    console.log('I will be called after 5s', job.data.email)
    // For demonstration purposes, we'll simulate sending an email
    console.log('Email sent successfully.');
  }, 5000);
});

// Endpoint to add jobs to the queue
app.get('/', async (req, res) => {
  for (let index = 0; index < 200; index++) {
      await Queue.add({ email: `${index}-akhshy@gmail.com` });
  }
  res.send('Email job added to the queue.');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
