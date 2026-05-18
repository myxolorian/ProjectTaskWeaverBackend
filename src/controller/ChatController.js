const ChatService = require('../service/ChatService');

class ChatController {

    static async sendChat(req, res) {
        const { group_id, user_id, channel_id, channel_message  } = req.body;

        try {
            const result = await ChatService.sendChat(group_id, user_id, channel_id, channel_message);

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
            console.error("❌ Error di Controller Chat (SendChat):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

}

module.exports = ChatController;