const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const nama = 'Pengguna';
  res.render('index', { nama, title: 'Mathec | Dashboard', page_name: 'dashboard' }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
