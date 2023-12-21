const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const nama = 'Pengguna';
  res.render('users', { nama }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
