const { Report } = require("@models");

class ReportController {
  static async addReport(req, res) {
    try {
      const {
        jenis_laporan,
        deskripsi,
        bukti_laporan,
        pelapor_id,
        terlapor_id,
        question_id,
        answer_id,
      } = req.body;

      if (!jenis_laporan || !deskripsi || !pelapor_id) {
        return res
          .status(500)
          .json({ success: false, message: "Lengkapi semua field" });
      }

      if (!terlapor_id && !question_id && !answer_id) {
        return res.status(500).json({
          success: false,
          message: "Tujuan wajib diisi",
        });
      }

      const report = await Report.create({
        jenis_laporan,
        deskripsi,
        bukti_laporan: "bukti.png",
        pelapor_id,
        terlapor_id,
        question_id,
        answer_id,
      });

      return res.status(201).json({
        success: true,
        messagge: "Berhasil menambah laporan ke admin",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = ReportController;
