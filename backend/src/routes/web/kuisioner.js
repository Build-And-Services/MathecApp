const express = require('express');
const router = express.Router();
const verify = require('./../../middleware/verify');
const { Questioner, CategoryQuestioner } = require('@models');

router.use(verify);
router.get('/', async (req, res) => {
  try {
    const kuisioners = await Questioner.findAll({
      include: [
        {
          model: CategoryQuestioner,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });
    const nama = 'Pengguna';
    res.render('kuisioner', {
      nama,
      title: 'Mathec | Kuisioner',
      page_name: 'kuisioner',
      admin: req.session.admin,
      kuisioners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

module.exports = router;
