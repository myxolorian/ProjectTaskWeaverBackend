const { pool } = require('../config/db');
const ChatModel = require('../model/ChatModel');

class ChatRepo {

    static async sendChat(group_id, user_id, channel_id, chat_message) {
        try {
            // 1. Eksekusi Stored Procedure untuk menyimpan pesan baru
            const query = `SELECT status, message FROM send_chat($1, $2, $3, $4)`;
            const values = [group_id, user_id, channel_id, chat_message];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            let newChatData = null;

            // 2. Jika SP sukses, ambil pesan terakhir yang baru saja masuk di channel ini
            if (responsDariSP && responsDariSP.status.toLowerCase() === 'success') {
                const latestChatResult = await pool.query(
                    `SELECT * FROM get_chat_by_channel_and_group($1, $2) ORDER BY audited_time DESC LIMIT 1`,
                    [group_id, channel_id]
                );

                if (latestChatResult.rows.length > 0) {
                    const chat = new ChatModel();
                    chat.fillFromDb(latestChatResult.rows[0]);
                    newChatData = chat;
                }
            }

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message,
                data: newChatData // Membawa data objek pesan tunggal yang riil
            };
        } catch (err) {
            console.error("Error di Chat Repo (Send Chat):", err.message);
            throw err;
        }
    }

    static async UpdateChat(chat_id, user_id, chat_message) {
        try {
            const query = `SELECT status, message FROM update_chat($1, $2, $3)`;
            const values = [chat_id, user_id, chat_message];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Chat Repo (Update Chat):", err.message);
            throw err;
        }
    }

    static async DeleteChat(chat_id, user_id) {
        try {
            const query = `SELECT status, message FROM delete_chat($1, $2)`;
            const values = [chat_id, user_id];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Chat Repo (Delete Chat):", err.message);
            throw err;
        }
    }

    static async GetChatByChannelAndGroup(group_id, channel_id) {
        try {
            const result = await pool.query(
                `SELECT * FROM get_chat_by_channel_and_group($1, $2)`,
                [group_id, channel_id]
            );

            const isSuccess = result.rows.length > 0;

            const chatList = isSuccess
                ? result.rows.map(dataMentah => {
                    const chat = new ChatModel();
                    chat.fillFromDb(dataMentah);
                    return chat;
                })
                : [];

            return { isSuccess, data: chatList };
        } catch (err) {
            console.error("Error di Chat Repo (GetChatByChannelAndGroup):", err.message);
            throw err;
        }
    }
}

module.exports = ChatRepo;