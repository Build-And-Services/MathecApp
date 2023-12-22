const express = require('express');
const router = express.Router();
const verify = require('./../../middleware/verify');
const { QuestionAnswer, Question, User } = require('@models');

router.use(verify);
router.get('/', async (req, res) => {
  try {
    const [questionsCount, answersCount, usersCount] = await Promise.all([
      Question.count(),
      QuestionAnswer.count(),
      User.count(),
    ]);

    res.render('index', {
      title: 'Mathec | Dashboard',
      page_name: 'dashboard',
      admin: req.session.admin,
      data: {
        questions: questionsCount,
        answers: answersCount,
        users: usersCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

module.exports = router;
