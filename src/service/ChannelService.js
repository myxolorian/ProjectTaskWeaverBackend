const ChannelRepo = require('../repo/ChannelRepo');

class ChannelService {

    static async createChannel(group_id, user_id, channel_name) {
        if (!group_id || !user_id || !channel_name) {
            return { isSuccess: false, pesan: 'Group ID, User ID, dan Channel Name wajib diisi!' };
        }

        try {
            const result = await ChannelRepo.createChannel(group_id, user_id, channel_name);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di ChannelService (createChannel):", err.message);
            throw err;
        }
    }


  
}

module.exports = ChannelService;