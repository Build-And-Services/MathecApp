const express = require('express');
const app = express();
const dashboard = require('./dashboard');
const questions = require('./questions');
const answers = require('./answers');
const users = require('./users');
const kuisioner = require('./kuisioner');
const login = require('./auth');
const verify = require('./../../middleware/verify');

app.use('/auth', login);
app.use(verify);
app.use('/', dashboard);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/users', users);
app.use('/kuisioner', kuisioner);

module.exports = app;
