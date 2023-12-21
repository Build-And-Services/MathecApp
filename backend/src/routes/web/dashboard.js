const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Mathec | Dashboard', page_name: 'dashboard', admin: req.session.admin }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
