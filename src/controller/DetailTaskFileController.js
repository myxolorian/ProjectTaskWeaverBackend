const DetailTaskFileService = require('../service/DetailTaskFileService');

class DetailTaskFileController {

    static async UploadFile(req, res) {
        const file = req.file;
        const { detail_task_id, uploaded_by, group_id, file_category } = req.body;

        if (!file) {
            return res.status(400).json({ status: "gagal", pesan: "File tidak ditemukan saat upload!" });
        }

        try {
            const result = await DetailTaskFileService.UploadAndInsertFile(
                file.buffer,
                file.originalname,
                file.mimetype,
                detail_task_id,
                uploaded_by,
                group_id,
                file_category
            );

            if (result.isSuccess) {
                res.status(201).json({ status: "sukses", pesan: result.pesan, url: result.file_url });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTaskFile (UploadFile):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetFilesByGroup(req, res) {
        const { group_id } = req.body;

        try {
            const result = await DetailTaskFileService.GetTaskFilesByGroup(group_id);

            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", data: result.data });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTaskFile (GetFilesByGroup):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetFilesByCategory(req, res) {
        const { group_id, file_category } = req.body;

        try {
            const result = await DetailTaskFileService.GetTaskFilesByCategory(group_id, file_category);

            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", data: result.data });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTaskFile (GetFilesByCategory):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }
}
module.exports = DetailTaskFileController;