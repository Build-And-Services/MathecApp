const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
const auth = require('./authentication');
const questions = require('./questions');
const home = require('./home');
const tag = require('./tag');
const users = require('./users');
const save = require('./save');
const questioner = require('./questioner');
const report = require('./report');
const GlobalMiddleware = require('../../middleware/GlobalMiddleware');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Auth route
app.use('/api/auth', auth);
// Tag route
// Middleware global, why "/auth" not use this middleware because it not requires middleware
app.use(GlobalMiddleware.check);
// Home route
app.use('/api/home', home);
app.use('/api/tag', tag);
app.use('/api/users', users);
app.use('/api/save', save);
app.use('/api/questioner', questioner);
app.use('/api/reports', report);

// Questions route
app.use('/api/questions', questions);
app.use('/api/*', (req, res) => {
  return res.json({
    code: 404,
    success: false,
    message: 'The route is not found',
  });
});

module.exports = app;
