const AuthService = require('../service/ChannelService');

class ChannelController {

    static async createChannel(req, res) {
        const { group_id, user_id, channel_name } = req.body;

        try {
            const result = await AuthService.createChannel(group_id, user_id, channel_name);

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
            console.error("❌ Error di Controller Channel (Create):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

}

module.exports = ChannelController;