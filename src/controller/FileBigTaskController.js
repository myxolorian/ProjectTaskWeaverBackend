const FileBigTaskService = require('../service/FileBigTaskService');

class FileBigTaskController {
    static async UploadFile(req, res) {
        const file = req.file;
        const { task_id } = req.body;
        if (!file) {
            return res.status(400).json({ status: "gagal", pesan: "File tidak ditemukan saat upload!" });
        }
        try {
            const result = await FileBigTaskService.UploadAndInsertFile(
                file.buffer, file.originalname, file.mimetype, task_id
            );
            if (result.isSuccess) {
                res.status(201).json({ status: "sukses", pesan: result.pesan, url: result.file_url });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller FileBigTask (UploadFile):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetFilesByTask(req, res) {
        const { task_id } = req.body;
        try {
            const result = await FileBigTaskService.GetFilesByTask(task_id);
            if (result.isSuccess) res.status(200).json({ status: "sukses", data: result.data });
            else res.status(400).json({ status: "gagal", pesan: result.pesan });
        } catch (err) {
            console.error("Error di Controller FileBigTask (GetByTask):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetFilesByGroup(req, res) {
        const { group_id } = req.body;
        try {
            const result = await FileBigTaskService.GetFilesByGroup(group_id);
            if (result.isSuccess) res.status(200).json({ status: "sukses", data: result.data });
            else res.status(400).json({ status: "gagal", pesan: result.pesan });
        } catch (err) {
            console.error("Error di Controller FileBigTask (GetByGroup):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async DeleteFile(req, res) {
        const { file_id } = req.body;
        try {
            const result = await FileBigTaskService.DeleteFile(file_id);
            if (result.isSuccess) res.status(200).json({ status: "sukses", pesan: result.pesan });
            else res.status(400).json({ status: "gagal", pesan: result.pesan });
        } catch (err) {
            console.error("Error di Controller FileBigTask (DeleteFile):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }
}

module.exports = FileBigTaskController;
