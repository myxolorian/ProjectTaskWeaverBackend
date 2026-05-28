const DetailTaskService = require('../service/DetailTaskService');

class DetailTaskController {

    static async InsertDetailTask(req, res) {
        const { task_id, user_id, detail_task_name, detail_task_deadline } = req.body;
        try {
            const result = await DetailTaskService.InsertDetailTask(task_id, user_id, detail_task_name, detail_task_deadline);
            if (result.isSuccess) {
                res.status(201).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTask (Insert):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetDetailTasksByUser(req, res) {
        const { user_id } = req.body;
        try {
            const result = await DetailTaskService.GetDetailTasksByUser(user_id);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", data: result.data });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTask (GetByUser):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetDetailTasksByTask(req, res) {
        const { task_id } = req.body;
        try {
            const result = await DetailTaskService.GetDetailTasksByTask(task_id);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", data: result.data });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTask (GetByTask):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetDetailTasksByGroup(req, res) {
        const { group_id } = req.body;
        try {
            const result = await DetailTaskService.GetDetailTasksByGroup(group_id);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", data: result.data });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTask (GetByGroup):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async UpdateDetailTaskStatus(req, res) {
        const { detail_task_id, new_status } = req.body;
        try {
            const result = await DetailTaskService.UpdateDetailTaskStatus(detail_task_id, new_status);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller DetailTask (UpdateStatus):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }
}

module.exports = DetailTaskController;