const express = require("express");
const router = express.Router();
const verify = require("./../../middleware/verify");
const {
  User,
  Questioner,
  CategoryQuestioner,
  LinkertScore,
} = require("@models");

router.use(verify);
router.get("/", async (req, res) => {
  try {
    const kuisioners = await Questioner.findAll({
      include: [
        {
          model: CategoryQuestioner,
          as: "category",
          attributes: ["name"],
        },
        {
          model: LinkertScore,
          as: "linkertScore",
          attributes: ["score"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const transformedData = kuisioners.map((d) => {
      const total_score = d.linkertScore.map((d) => d.score);
      const user = total_score.length;
      const score = total_score.reduce((previous, current) => {
        const sum = previous + current;
        previous = sum;
        return sum;
      }, 0);

      return {
        id: d.id,
        questioner: d.questioner,
        category: d.category.name,
        score,
        total: user,
        linkertScore: d.linkertScore.map((item) => {
          return {
            user: item.user.name,
            score: item.score,
          };
        }),
      };
    });

    const nama = "Pengguna";
    res.render("kuisioner", {
      nama,
      title: "Mathec | Kuisioner",
      page_name: "kuisioner",
      admin: req.session.admin,
      kuisioners: transformedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

module.exports = router;
