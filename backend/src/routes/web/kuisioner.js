const express = require("express");
const router = express.Router();
const verify = require("./../../middleware/verify");
const { User, Questioner, Report, LinkertScore, Profile } = require("@models");

router.use(verify);
router.get("/", async (req, res) => {
  try {
    const [notifications, users] = await Promise.all([
      Report.findAll({
        where: {
          read: false,
        },
        include: [
          {
            model: User,
            as: "pelapor",
            paranoid: false,
            include: [
              {
                model: Profile,
                as: "Profile",
              },
            ],
          },
        ],
      }),
      User.findAll({
        include: [
          {
            model: LinkertScore,
            as: "linkertScore",
            attributes: ["score"],
          },
        ],
        attributes: ["id", "name", "email"],
      }),
    ]);

    const transformedData = users.map((d) => {
      const total_score = d.linkertScore.map((d) => d.score);
      const user = total_score.length;
      const score = total_score.reduce((previous, current) => {
        const sum = previous + current;
        previous = sum;
        return sum;
      }, 0);

      return {
        id: d.id,
        name: d.name,
        email: d.email,
        score,
        total: user,
      };
    });

    const nama = "Pengguna";
    return res.render("kuisioner", {
      nama,
      title: "Mathec | Kuisioner",
      page_name: "kuisioner",
      admin: req.session.admin,
      kuisioners: transformedData,
      notifications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Questioner,
          as: "questioner",
        },
        Profile,
      ],
    });

    return res.render("detail_kuisioner", {
      title: "Mathec | " + user.name,
      page_name: "kuisioner",
      admin: req.session.admin,
      user,
    });
  } catch (error) {
    return res.render("error", {
      message: "Terjadi kesalahan",
      error: error,
    });
  }
});

module.exports = router;
