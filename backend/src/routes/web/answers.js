const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const cheerio = require("cheerio");
const verify = require("./../../middleware/verify");
const { Report, QuestionAnswer, User } = require("@models");

router.use(verify);
router.get("/", async (req, res) => {
  const answerReport = await Report.findAll({
    include: [
      {
        model: User,
        as: "pelapor",
        attributes: ["name"],
      },
      {
        model: QuestionAnswer,
        as: "answer",
        attributes: ["id", "title", "body"],
      },
    ],
    where: {
      pelapor_id: {
        [Op.not]: null,
      },
    },
  });
  const transformedData = answerReport.map((d) => {
    const $ = cheerio.load(d.answer.body);
    return {
      id: d.id,
      answer_id: d.answer.id,
      answer: $.text(),
      jenis_laporan: d.jenis_laporan,
      deskripsi: d.deskripsi,
      pelapor: d.pelapor.name,
      bukti_laporan: d.bukti_laporan,
    };
  });
  const nama = "Pengguna";
  res.render("answers", {
    nama,
    title: "Mathec | Answer",
    page_name: "answers",
    admin: req.session.admin,
    reports: transformedData,
  });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Report.destroy({
    where: {
      answer_id: id,
    },
  });
  await QuestionAnswer.destroy({
    where: {
      id,
    },
  });
  res.redirect("/questions");
});
module.exports = router;
