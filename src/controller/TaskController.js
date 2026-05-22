const TaskService = require('../service/TaskService');

class TaskController {

    static async InsertTask(req, res) {
		const { Group_id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId } = req.body; // kalau mau test  postman, pastikan body nya sesuai dengan ini ya, jadi group_name dan user_id harus ada di body

        try {
            const result = await TaskService.InsertTask(Group_id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId);

            if (result.isSuccess) {
                res.status(201).json({
                    status: "sukses",
                    pesan: result.pesan
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


    static async UpdateTask(req, res) {
		const { Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite } = req.body; // kalau mau test  postman, pastikan body nya sesuai dengan ini ya, jadi group_name dan user_id harus ada di body

        try {
            const result = await TaskService.UpdateTask(Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite);

            if (result.isSuccess) {
                res.status(201).json({
                    status: "sukses",
                    pesan: result.pesan
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async DeleteTask(req, res) {
		const { Task_Id, requester_user_Id } = req.body; // kalau mau test  postman, pastikan body nya sesuai dengan ini ya, jadi group_name dan user_id harus ada di body

        try {
            const result = await TaskService.DeleteTask(Task_Id, requester_user_Id);

            if (result.isSuccess) {
                res.status(201).json({
                    status: "sukses",
                    pesan: result.pesan
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async UpdateTaskStatus(req, res) {
		const { Task_Id, NewStatus, requester_user_Id } = req.body; // kalau mau test postman, pastikan body nya sesuai dengan ini ya

        try {
            const result = await TaskService.UpdateTaskStatus(Task_Id, NewStatus, requester_user_Id);

            if (result.isSuccess) {
                res.status(201).json({
                    status: "sukses",
                    pesan: result.pesan
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }
    static async GetTasksByGroup(req, res) {
        const { Group_Id } = req.body;

        try {
            const result = await TaskService.GetTasksByGroup(Group_Id);

            if (result.isSuccess) {
                res.status(200).json({
                    status: "sukses",
                    data: result.data
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetTaskById(req, res) {
        const { Task_Id } = req.body;

        try {
            const result = await TaskService.GetTaskById(Task_Id);

            if (result.isSuccess) {
                res.status(200).json({
                    status: "sukses",
                    data: result.data
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetTasksByUser(req, res) {
        const { User_Id } = req.body;

        try {
            const result = await TaskService.GetTasksByUser(User_Id);

            if (result.isSuccess) {
                res.status(200).json({
                    status: "sukses",
                    data: result.data
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("Error di Controller (Task):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }
}

module.exports = TaskController;