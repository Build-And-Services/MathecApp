const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  const nama = 'Pengguna';
  res.render('auth/login', { nama, title: 'Mathec | Login', page_name: 'login' }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
