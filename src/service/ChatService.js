const ChatRepo = require('../repo/ChatRepo');
class ChatService {

    static async sendChat(group_id, user_id, channel_id, channel_message) {
        if (!group_id || !user_id || !channel_id || !channel_message) {
            return { isSuccess: false, pesan: 'Group ID, User ID, Channel ID, dan Channel Message wajib diisi!' };
        }

        try {
            const result = await ChatRepo.sendChat(group_id, user_id, channel_id, channel_message);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Chat service SendChat :", err.message);
            throw err;
        }
    }



}

module.exports = ChatService;