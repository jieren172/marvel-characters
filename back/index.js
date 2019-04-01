#!/usr/bin/env node

// const serverless = require('serverless-http');
const app = require('./src/api');

// // Choose the port and start the server
// const port = process.env.PORT || 3005;  //eslint-disable-line
// app.listen(port, () => {
//   console.log(`Mixing it up on port ${port}`);
// });


// Handle in-valid route
app.all('*', function(req, res) {
  const response = { data: null, message: 'Route not found!!' }
  res.status(400).send(response)
})

// wrap express app instance with serverless http function
// module.exports.handler = serverless(app)
module.exports = { app: app }
