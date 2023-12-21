const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const nama = 'Pengguna';
  res.render('answers', { nama, title: 'Mathec | Answer', page_name: 'answers' }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
