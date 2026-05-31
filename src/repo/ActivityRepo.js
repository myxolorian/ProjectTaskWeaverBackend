const { pool } = require('../config/db');

class ActivityRepo {
    static async GetGroupActivity(group_id) {
        try {
            const query = `
                SELECT 
                    a.log_id, 
                    a.action_type, 
                    a.action_description, 
                    a.audited_time,
                    u.user_full_name, 
                    t.task_title
                FROM tr_activity_log a
                LEFT JOIN ms_user u ON a.user_id = u.user_id
                LEFT JOIN tr_task t ON a.task_id = t.task_id
                WHERE t.group_id = $1
                ORDER BY a.audited_time DESC
                LIMIT 10;
            `;
            const result = await pool.query(query, [group_id]);
            return result.rows;
        } catch (err) {
            console.error("Error di ActivityRepo:", err.message);
            throw err;
        }
    }
    static async InsertActivity(task_id, user_id, action_type, action_description) {
        try {
            const query = `
                INSERT INTO tr_activity_log (task_id, user_id, action_type, action_description, audited_activity, audited_time)
                VALUES ($1, $2, $3, $4, 'I', now())
            `;
            await pool.query(query, [task_id, user_id, action_type, action_description]);
            return true;
        } catch (err) {
            console.error("Error insert activity log:", err.message);
            throw err;
        }
    }
}
module.exports = ActivityRepo;