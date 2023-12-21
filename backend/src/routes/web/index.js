const express = require('express');
const app = express();
const dashboard = require('./dashboard');
const questions = require('./questions');
const answers = require('./answers');
const users = require('./users');
const kuisioner = require('./kuisioner');

app.use('/', dashboard);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/users', users);
app.use('/kuisioner', kuisioner);

module.exports = app;
