const express = require('express');
const app = express();
const dashboard = require('./dashboard');
const questions = require('./questions');
const answers = require('./answers');
const users = require('./users');

app.use('/', dashboard);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/users', users);

module.exports = app;
