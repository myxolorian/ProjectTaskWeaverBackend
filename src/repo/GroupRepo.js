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
            console.error("Error di Repo Group (InsertGroup):", err.message);
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
            console.error("Error di Repo Group (JoinGroup):", err.message);
            throw err;
        }
    }

    static async KickGroup(group_id, user_id, requester_user_id) {
        try {                                          
            const query = `SELECT status, message FROM delete_enrollment($1, $2, $3)`;
            const values = [group_id, user_id, requester_user_id];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Group (KickGroup):", err.message);
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
            console.error("Error di Repo Group (GetGroup):", err.message);
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
            console.error("Error di Repo Group (GetMember):", err.message);
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
            console.error("Error di Repo Group (GetInviteCode):", err.message);
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
            console.error("Error di Repo Group (GetGroupbyInviteCode):", err.message);
            throw err;
        }
    }

    static async GetGroupByUserID(user_id) {
        try {
            const finalUserId = user_id || null;
            const query = `SELECT * FROM get_group_by_user_id($1)`;
            const result = await pool.query(query, [finalUserId]);

            let groupList = [];
            const isSuccess = result.rows.length > 0;

            if (isSuccess) {
                groupList = result.rows.map(dataMentah => {
                    const groupData = new GroupModel();
                    groupData.fillFromDb(dataMentah);
                    return groupData;
                });
            }

            return {
                isSuccess: isSuccess,
                data: groupList
            };
        } catch (err) {
            console.error("Error di Repo Group (GetGroupByUserID):", err.message);
            throw err;
        }
    }

    static async DeleteGroup(group_id, user_id) {
        try {
            const query = `SELECT status, message FROM delete_group($1, $2)`;
            const values = [group_id, user_id];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Group (DeleteGroup):", err.message);
            throw err;
        }
    }

    static async UpdateGroup(group_id, user_id, group_name, group_description) {
        try {
            const query = `SELECT status, message FROM update_group($1, $2, $3, $4)`;
            const values = [group_id, user_id, group_name, group_description];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Group (UpdateGroup):", err.message);
            throw err;
        }
    }



    static async UpdateUserRole(group_id, user_id, requester_id, user_role) {
        try {
            const query = `SELECT status, message FROM update_user_role_by_id($1, $2, $3, $4)`;
            const values = [group_id, user_id, requester_id, user_role];

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