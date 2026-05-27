const { pool } = require('../config/db');
const ChatModel = require('../model/ChatModel');

class ChatRepo {

    static async sendChat(group_id, user_id, channel_id, chat_message) {
        try {
            const query = `SELECT status, message FROM send_chat($1, $2, $3, $4)`;
            const values = [group_id, user_id, channel_id, chat_message ];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
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

}

module.exports = ChatRepo;