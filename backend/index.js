const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('module-alias/register');
const routes = require('./src/routes/api');
const web = require('./src/routes/web');
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use('/src/image', express.static(path.join(__dirname, 'src', 'image')));
app.use(
  '/public/assets',
  express.static(path.join(__dirname, 'public', 'assets'))
);
app.use(
  '/src/avatarprofiles',
  express.static(path.join(__dirname, 'src', 'avatarprofiles'))
);

app.use(web);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
