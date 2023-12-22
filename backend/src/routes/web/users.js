const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const verify = require("./../../middleware/verify");
const { Report, User } = require("@models");

router.use(verify);
router.get("/", async (req, res) => {
  const userReport = await Report.findAll({
    include: [
      {
        model: User,
        as: "pelapor",
        attributes: ["name"],
      },
      {
        model: User,
        as: "terlapor",
        attributes: ["id", "name"],
      },
    ],
    where: {
      terlapor_id: {
        [Op.not]: null,
      },
    },
  });

  const nama = "Pengguna";
  // res.status(500).json({
  //   userReport,
  // });
  res.render("users", {
    nama,
    title: "Mathec | Users",
    page_name: "users",
    admin: req.session.admin,
    reports: userReport,
  });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Report.destroy({
    where: {
      terlapor_id: id,
    },
  });
  await User.destroy({
    where: {
      id,
    },
  });
  res.redirect("/users");
});

module.exports = router;
