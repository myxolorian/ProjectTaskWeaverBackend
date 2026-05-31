const ActivityRepo = require('../repo/ActivityRepo');

class ActivityController {
    static async GetActivity(req, res) {
        const { group_id } = req.body;
        if (!group_id) return res.status(400).json({ status: "gagal", pesan: "group_id wajib diisi!" });

        try {
            const data = await ActivityRepo.GetGroupActivity(group_id);
            res.status(200).json({ status: "sukses", data: data });
        } catch (err) {
            res.status(500).json({ status: "error", pesan: "Gagal menarik activity log." });
        }
    }
    static async CreateActivity(req, res) {
        const { task_id, user_id, action_type, action_description } = req.body;
        try {
            await ActivityRepo.InsertActivity(task_id, user_id, action_type, action_description);
            res.status(201).json({ status: "sukses" });
        } catch (err) {
            res.status(500).json({ status: "error", pesan: err.message });
        }
    }
}
module.exports = ActivityController;