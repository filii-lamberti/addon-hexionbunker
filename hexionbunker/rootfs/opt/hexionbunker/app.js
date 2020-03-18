// Nodig voor externe files
const fs = require('fs');

// Here we import the options.json file
// from the add-on persistent data directory
// that contains our configuration
const options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
/*const options = {
  logger: true,
  debugging: false,
}*/

// status of logging
const { logging } = options;
// function to filter console logs
function log(message) {
  if (logging) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}
// prints if logging is true
if (logging) {
  log('Logging is enabled');
}

// status of debugging
const { debugging } = options;
// prints if debugging is true
if (debugging) {
  log('Debugging is enabled');
  process.env.DEBUG = '*';
}

// Gebruikt voor momenten
const moment = require('moment');
// Set the locale to dutch
moment.locale('nl');

// Setup basic express server
const express = require('express');
const path = require('path');

const app = express();
// Constant for port
const port = process.env.PORT || 3000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

const axios = require('axios');
const cheerio = require('cheerio');

const bunker = {
  url: 'https://hexion.pxl.be/bunker.php',
  state: 'gesloten',
  since: moment(),
};

function getData() {
  axios.get(bunker.url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      let newState = $('#accordion > h1').text().trim();
      if (newState !== bunker.state) {
        bunker.since = moment();
        bunker.state = newState;
      }

      // after scrape
      io.emit('update', bunker);

      console.log(bunker);
    })
    .catch(error => {
      console.log(error);
    });
}

setInterval(getData, 10000);

// we are specifying the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', (req, res) => {
  res.json(bunker);
});

// Launch listening server on port 8212
http.listen(port, () => {
  log(`listening on port ${port}!`);
});

io.on('connection', (socket) => {
  log('a user is connected');

  socket.emit('update', bunker);

  socket.on('disconnect', () => {
    log('user disconnected');
  });
});
