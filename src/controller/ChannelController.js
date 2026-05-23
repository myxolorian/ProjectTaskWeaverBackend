const ChannelService = require('../service/ChannelService');

class ChannelController {

    static async createChannel(req, res) {
        const { group_id, user_id, channel_name } = req.body;

        try {
            const result = await ChannelService.createChannel(group_id, user_id, channel_name);

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
            console.error("Error di Controller Channel (Create):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


    static async GetChannelByGroupId(req, res) {
        const { group_id } = req.body;
        try {
            const result = await ChannelService.GetChannelByGroupId(group_id);
            res.status(200).json({ status: "sukses", data: result.data });
        } catch (err) {
            console.error("Error di Controller (Channel) getChannelByGroupId:", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }



    static async DeleteChannel(req, res) {
        const { channel_id, group_id, user_id } = req.body;
        try {
            const result = await ChannelService.DeleteChannel(channel_id, group_id, user_id);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller (Channel):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


    static async UpdateChannel(req, res) {
        const { channel_id, group_id, user_id, channel_name } = req.body;
        try {
            const result = await ChannelService.UpdateChannel(channel_id, group_id, user_id, channel_name);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller (Channel):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


}

module.exports = ChannelController;