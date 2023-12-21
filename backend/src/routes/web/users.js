const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const nama = 'Pengguna';
  res.render('users', { nama, title: 'Mathec | Users', page_name: 'users', admin: req.session.admin }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
