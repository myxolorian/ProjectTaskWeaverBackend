const { pool } = require('../config/db');

class ActivityRepo {

    static async GetGroupActivity(group_id) {
        try {
            const result = await pool.query(
                `SELECT * FROM get_group_activity($1)`,
                [group_id]
            );
            return result.rows;
        } catch (err) {
            console.error("Error di ActivityRepo:", err.message);
            throw err;
        }
    }

    static async InsertActivity(task_id, user_id, action_type, action_description) {
        try {
            await pool.query(
                `SELECT insert_activity($1, $2, $3, $4)`,
                [task_id, user_id, action_type, action_description]
            );
            return true;
        } catch (err) {
            console.error("Error insert activity log:", err.message);
            throw err;
        }
    }
}

module.exports = ActivityRepo;