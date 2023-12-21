const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const verify = require('./../../middleware/verify');
const { Report, User } = require('@models');

router.use(verify);
router.get('/', async (req, res) => {
  const userReport = await Report.findAll({
    include: [
      {
        model: User,
        as: 'pelapor',
        attributes: ['name'],
      },
      {
        model: User,
        as: 'terlapor',
        attributes: ['id', 'name'],
      },
    ],
    where: {
      pelapor_id: {
        [Op.not]: null,
      },
    },
  });

  const nama = 'Pengguna';
  res.render('users', {
    nama,
    title: 'Mathec | Users',
    page_name: 'users',
    admin: 'req.session.admin',
    reports: userReport,
  });
});

router.get('/delete/:id/:idreport', async (req, res) => {
  const { id, idreport } = req.params;
  await Report.destroy({
    where: {
      id: idreport,
    },
  });
  await User.destroy({
    where: {
      id,
    },
  });
  res.redirect('/users');
});

module.exports = router;
