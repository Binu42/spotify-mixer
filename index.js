require('dotenv').config({ path: `${__dirname}/app.env` });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

const api = require('./apiRoutes');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', api);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
  const routes = ['/', '/playlists', '/results'];
  routes.forEach(route => {
    app.get(route, function (req, res) {
      console.log(__dirname)
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
  })
}

app.listen(process.env.PORT || 8080, function () {
  console.log('Spotify playlist generator started');
});
