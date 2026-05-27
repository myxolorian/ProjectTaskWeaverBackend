const ChatService = require('../service/ChatService');

class ChatController {

    static async sendChat(req, res) {
        const { group_id, user_id, channel_id, chat_message  } = req.body;

        try {
            const result = await ChatService.sendChat(group_id, user_id, channel_id, chat_message);

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

     static async UpdateChat(req, res) {
        const { chat_id, user_id, chat_message } = req.body;

        try {
            const result = await ChatService.UpdateChat(chat_id, user_id, chat_message);

            if (result.isSuccess) {
                res.status(200).json({
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
            console.error("❌ Error di Controller Chat (UpdateChat):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async DeleteChat(req, res) {
        const { chat_id, user_id } = req.body;

        try {
            const result = await ChatService.DeleteChat(chat_id, user_id);

            if (result.isSuccess) {
                res.status(200).json({
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
            console.error("❌ Error di Controller Chat (DeleteChat):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

}

module.exports = ChatController;