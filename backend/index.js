const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('module-alias/register');
const routes = require('./src/routes/api');
const web = require('./src/routes/web');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: '4c1cab66c1693721a84e0f368f39aea67976280518ec9dba1f7619baba64f9b6097c46602bc933654fdc47e3f03d232396ba7aea06352144849469c4cde6b1c1',
    name: 'secretSession',
    cookie: {
      sameSite: true,
      maxAge: 1000000,
    },
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.setHeader('Pragma', 'no-cache');
  next();
});

app.set('view engine', 'ejs');
app.use('/src/image', express.static(path.join(__dirname, 'src', 'image')));
app.use('/public/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/src/avatarprofiles', express.static(path.join(__dirname, 'src', 'avatarprofiles')));

app.use(web);
app.use(routes);

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
