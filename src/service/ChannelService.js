const ChannelRepo = require('../repo/ChannelRepo');

class ChannelService {

    static async createChannel(group_id, user_id, channel_name) {
        if (!group_id || !user_id || !channel_name) {
            return { isSuccess: false, pesan: 'Group ID, User ID, dan Channel Name wajib diisi!' };
        }

        try {
            const result = await ChannelRepo.createChannel(group_id, user_id, channel_name);
            
            if (result.status && result.status.toLowerCase() === 'success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan || 'Gagal membuat channel' };
            }
        } catch (err) {
            console.error("Error di ChannelService (createChannel):", err.message);
            throw err;
        }
    }

    static async GetChannelByGroupId(group_id) {
        if (!group_id) {
            return { isSuccess: false, pesan: 'group_id wajib diisi!' };
        }
        try {
            return await ChannelRepo.GetChannelByGroupId(group_id);
        } catch (err) {
            console.error("Error di Service Channel (GetChannelByGroupId):", err.message);
            throw err;
        }
    }

    static async DeleteChannel(channel_id, group_id, user_id) {
        if (!channel_id || !group_id || !user_id) {
            return { isSuccess: false, pesan: 'channel_id, group_id, dan user_id wajib diisi!' };
        }
        try {
            const result = await ChannelRepo.DeleteChannel(channel_id, group_id, user_id);
            if (result.status && result.status.toLowerCase() === 'success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan || 'Gagal menghapus channel' };
            }
        } catch (err) {
            console.error("Error di Service Channel:", err.message);
            throw err;
        }
    }   

    static async UpdateChannel(channel_id, group_id, user_id, channel_name) {
        if (!channel_id || !group_id || !user_id || !channel_name) {
            return { isSuccess: false, pesan: 'channel_id, group_id, user_id, dan channel_name wajib diisi!' };
        }
        try {
            const result = await ChannelRepo.UpdateChannel(channel_id, group_id, user_id, channel_name);
            if (result.status && result.status.toLowerCase() === 'success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan || 'Gagal memperbarui channel' };
            }
        } catch (err) {
            console.error("Error di Service Channel (UpdateChannel):", err.message);
            throw err;
        }
    }
}

module.exports = ChannelService;