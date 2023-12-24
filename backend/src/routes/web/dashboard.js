const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const verify = require('./../../middleware/verify');
const { QuestionAnswer, Question, User, LinkertScore } = require('@models');

router.use(verify);
router.get('/', async (req, res) => {
  try {
    const [questionsCount, answersCount, usersCount, linkertscore] = await Promise.all([
      Question.count(),
      QuestionAnswer.count(),
      User.count(),
      LinkertScore.findAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],
        group: ['id_user'],
      }),
    ]);

    const userFilled = linkertscore.length;

    res.render('index', {
      title: 'Mathec | Dashboard',
      page_name: 'dashboard',
      admin: req.session.admin,
      data: {
        questions: questionsCount,
        answers: answersCount,
        users: usersCount,
        kuisioners: (userFilled / usersCount) * 100,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

module.exports = router;
