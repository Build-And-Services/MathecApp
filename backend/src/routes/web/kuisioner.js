const express = require('express');
const router = express.Router();
const verify = require('./../../middleware/verify');

router.use(verify);
router.get('/', (req, res) => {
  const nama = 'Pengguna';
  res.render('kuisioner', {
    nama,
    title: 'Mathec | Kuisioner',
    page_name: 'kuisioner',
    admin: req.session.admin,
  }); // Render file index.ejs dengan variabel 'nama'
});

module.exports = router;
