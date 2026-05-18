const { pool } = require('../config/db');
const UserModel = require('../model/ChatModel');

class ChatRepo {

    static async sendChat(group_id, user_id, channel_id, channel_message) {
        try {
            const query = `SELECT status, message FROM send_chat($1, $2, $3, $4)`;
            const values = [group_id, user_id, channel_id, channel_message ];

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

}

module.exports = ChatRepo;