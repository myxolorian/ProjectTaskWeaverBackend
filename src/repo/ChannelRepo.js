const { pool } = require('../config/db');
const UserModel = require('../model/ChannelModel');

class ChannelRepo {

    static async createChannel(group_id, user_id, channel_name) {
        try {
            const query = `SELECT status, message FROM create_channel($1, $2, $3)`;
            const values = [group_id, user_id, channel_name];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di ChannelRepo (Create Channel):", err.message);
            throw err;
        }
    }

}

module.exports = ChannelRepo;