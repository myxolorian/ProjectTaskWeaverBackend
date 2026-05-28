const ChatRepo = require('../repo/ChatRepo');
class ChatService {

    static async sendChat(group_id, user_id, channel_id, chat_message) {
        if (!group_id || !user_id || !channel_id || !chat_message) {
            return { isSuccess: false, pesan: 'Group ID, User ID, Channel ID, dan Channel Message wajib diisi!' };
        }

        try {
            const result = await ChatRepo.sendChat(group_id, user_id, channel_id, chat_message);
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

    static async UpdateChat(chat_id, user_id, chat_message) {
        if (!chat_id || !user_id || !chat_message) {
            return { isSuccess: false, pesan: 'Chat ID, User ID, dan Chat Message wajib diisi!' };
        }

        try {
            const result = await ChatRepo.UpdateChat(chat_id, user_id, chat_message);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Chat Service (UpdateChat):", err.message);
            throw err;
        }
    }

    static async DeleteChat(chat_id, user_id) {
        if (!chat_id || !user_id) {
            return { isSuccess: false, pesan: 'Chat ID dan User ID wajib diisi!' };
        }

        try {
            const result = await ChatRepo.DeleteChat(chat_id, user_id);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Chat Service (DeleteChat):", err.message);
            throw err;
        }
    }

    static async GetChatByChannelAndGroup(group_id, channel_id) {
        if (!group_id || !channel_id) {
            return { isSuccess: false, pesan: 'Group ID dan Channel ID wajib diisi!' };
        }

        try {
            return await ChatRepo.GetChatByChannelAndGroup(group_id, channel_id);
        } catch (err) {
            console.error("Error di Chat Service (GetChat):", err.message);
            throw err;
        }
    }



}

module.exports = ChatService;