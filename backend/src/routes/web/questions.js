const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const verify = require('./../../middleware/verify');
const { Report, Question, User } = require('@models');

router.use(verify);
router.get('/', async (req, res) => {
  const questionReport = await Report.findAll({
    include: [
      {
        model: User,
        as: 'pelapor',
        attributes: ['name'],
      },
      {
        model: Question,
        as: 'question',
        attributes: ['id', 'title', 'body'],
      },
    ],
    where: {
      question_id: {
        [Op.not]: null,
      },
    },
  });
  const nama = 'Pengguna';
  res.render('questions', {
    nama,
    title: 'Mathec | Question',
    page_name: 'questions',
    admin: req.session.admin,
    reports: questionReport,
  });
});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Report.destroy({
    where: {
      question_id: id,
    },
  });
  await Question.destroy({
    where: {
      id,
    },
  });
  res.redirect('/questions');
});

module.exports = router;
