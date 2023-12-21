const express = require('express');
const router = express.Router();
const verify = require('./../../middleware/verify');

router.use(verify);
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Mathec | Dashboard',
    page_name: 'dashboard',
    admin: req.session.admin,
  }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
