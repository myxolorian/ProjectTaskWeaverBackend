const { pool } = require('../config/db');
const UserModel = require('../model/GroupModel');

class GroupRepo {

    static async InsertGroup(groupName, userId) {
        try {
            const query = `SELECT status, message FROM insert_group($1, $2)`;
            const values = [groupName, userId ];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;
        }
    }


    static async JoinGroup(group_id, user_id, user_role) {
        try {
            const query = `SELECT status, message FROM insert_enrollment($1, $2, $3)`;
            const values = [group_id, user_id, user_role];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;

        }
    }
}

module.exports = GroupRepo;