const { pool } = require('../config/db');
const ChannelModel = require('../model/ChannelModel');

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


    static async GetChannelByGroupId(group_id) {
        try {
            const result = await pool.query(`SELECT * FROM get_channel_by_group_id($1)`, [group_id]);

            const isSuccess = result.rows.length > 0;

            const channelList = isSuccess
                ? result.rows.map(dataMentah => {
                    const channel = new ChannelModel();
                    channel.fillFromDb(dataMentah);
                    return channel;
                })
                : [];

            return { isSuccess, data: channelList };
        } catch (err) {
            console.error("Error di Repo Channel", err.message);
            throw err;
        }
    }


    static async DeleteChannel(channel_id, group_id, user_id) {
        try {
            const query = `SELECT status, message FROM delete_channel($1, $2, $3)`;
            const values = [channel_id, group_id, user_id];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Channel", err.message);
            throw err;
        }
    }




    static async UpdateChannel(channel_id, group_id, user_id, channel_name) {
        try {
            const query = `SELECT status, message FROM update_channel($1, $2, $3, $4)`;
            const values = [channel_id, group_id, user_id, channel_name];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Channel", err.message);
            throw err;
        }
    }



    


}

module.exports = ChannelRepo;