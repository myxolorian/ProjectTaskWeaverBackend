const GroupService = require('../service/GroupService');

class GroupController {

    static async InsertGroup(req, res) {
		const { group_name, user_id } = req.body; // kalau mau test  postman, pastikan body nya sesuai dengan ini ya, jadi group_name dan user_id harus ada di body

        try {
            const result = await GroupService.InsertGroup(group_name, user_id);

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
            console.error("Error di Controller (Group):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async JoinGroup(req, res) {
        const { group_id, user_id, user_role } = req.body; // pastikan body nya sesuai dengan ini ya, jadi group_id, user_id, dan user_role_id harus ada di body

        try {
			const result = await GroupService.JoinGroup(group_id, user_id, user_role);
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
            console.error("Error di Controller (Group):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async KickGroup(req, res) {
        const { group_id, user_id, user_requester_id } = req.body; // pastikan body nya sesuai dengan ini ya, jadi group_id, user_id, dan user_role_id harus ada di body

        try {
            const result = await GroupService.KickGroup(group_id, user_id, user_requester_id);
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
            console.error("Error di Controller (Group):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetGroup(req, res) {
        const { group_id } = req.body;

        try {
            const result = await GroupService.GetGroup(group_id);

            res.status(200).json({
                status: "sukses",
                data: result.data
            });
        } catch (err) {
            console.error("Error di Controller (Group):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetMember(req, res) {
        const { group_id } = req.body;

        try {
            const result = await GroupService.GetMember(group_id);
            res.status(200).json({
                status: "sukses",
                data: result.data
            });
        } catch (err) {
            console.error("Error di Controller (Group):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

}

module.exports = GroupController;