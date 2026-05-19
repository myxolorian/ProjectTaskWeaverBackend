const { pool } = require('../config/db');
const GroupModel = require('../model/GroupModel');

class GroupRepo {

    static async InsertGroup(groupName, userId, invite_code, group_description) {
        try {
            const query = `SELECT status, message FROM insert_group($1, $2, $3, $4)`;
            const values = [groupName, userId, invite_code, group_description];

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
        try {                                          //SP              // parameter yang dikirim ke SP
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

    static async KickGroup(group_id, user_id, requester_user_id) {
        try {                                          //SP              // parameter yang dikirim ke SP
            const query = `SELECT status, message FROM delete_enrollment($1, $2, $3)`;
            const values = [group_id, user_id, requester_user_id];

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

    static async GetGroup(group_id) {
        try {
            const finalGroupId = group_id || null;

            const query = `SELECT * FROM get_groupList($1)`;
            const result = await pool.query(query, [finalGroupId]);

            return result.rows;
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;
        }
    }


    static async GetMember(group_id) {
        try {
            const finalGroupId = group_id || null;

            const query = `SELECT * FROM get_enrollment($1)`;
            const result = await pool.query(query, [finalGroupId]);

            return result.rows;
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;
        }
    }

    static async GetInviteCode(group_id) {
        try {
            const finalGroupId = group_id || null;

            const query = `SELECT * FROM get_group_invite_code($1)`;
            const result = await pool.query(query, [finalGroupId]);

            return result.rows;
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;
        }
    }


    static async GetGroupbyInviteCode(invite_code) {
        try {
            const finalInviteCode = invite_code || null;

            const query = `SELECT * FROM get_group_by_invite_code($1)`;
            const result = await pool.query(query, [finalInviteCode]);


            let groupData = null;

            const isSuccess = result.rows.length > 0;

            if (isSuccess) {
                const dataMentah = result.rows[0];

                groupData = new GroupModel();
                groupData.fillFromDb(dataMentah);
            }


            return {
                isSuccess: isSuccess,
                data: groupData 
            };
        } catch (err) {
            console.error("Error di Repo Group", err.message);
            throw err;
        }
    }


}

module.exports = GroupRepo;