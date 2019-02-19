#!/usr/bin/env node
const app = require('./api');

// Choose the port and start the server
const port = process.env.PORT || 3005;  //eslint-disable-line
app.listen(port, () => {
  console.log(`Mixing it up on port ${port}`);
});
