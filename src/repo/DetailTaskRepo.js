const { pool } = require('../config/db');
const DetailTaskModel = require('../model/DetailTaskname');

class DetailTaskRepo {

    static async InsertDetailTask(task_id, user_id, detail_task_name, detail_task_deadline) {
        try {
            const query = `SELECT status, message FROM insert_detail_task($1, $2, $3, $4)`;
            const values = [task_id, user_id, detail_task_name, detail_task_deadline];
            const result = await pool.query(query, values);
            const row = result.rows[0];
            return { status: row.status, pesan: row.message };
        } catch (err) {
            console.error("Error di Repo DetailTask (Insert):", err.message);
            throw err;
        }
    }

    static async GetDetailTasksByUser(user_id) {
        try {
            const result = await pool.query(
                `SELECT * FROM get_detail_tasks_by_user($1)`,
                [user_id]
            );
            return result.rows;
        } catch (err) {
            console.error("Error di Repo DetailTask (GetByUser):", err.message);
            throw err;
        }
    }

    static async GetDetailTasksByTask(task_id) {
        try {
            const query = `SELECT * FROM get_detail_tasks_by_task($1::integer)`;
            const result = await pool.query(query, [task_id]);
            return result.rows.map(row => {
                const m = new DetailTaskModel();
                m.fillFromDb(row);
                return m;
            });
        } catch (err) {
            console.error("Error di Repo DetailTask (GetByTask):", err.message);
            throw err;
        }
    }

    static async GetDetailTasksByGroup(group_id) {
        try {
            const query = `SELECT * FROM get_detail_tasks_by_group($1::integer)`;
            const result = await pool.query(query, [group_id]);
            return result.rows.map(row => {
                const m = new DetailTaskModel();
                m.fillFromDb(row);
                return m;
            });
        } catch (err) {
            console.error("Error di Repo DetailTask (GetByGroup):", err.message);
            throw err;
        }
    }

    static async UpdateDetailTaskStatus(detail_task_id, new_status) {
        try {
            await pool.query(
                `SELECT update_detail_task_status($1, $2)`,
                [detail_task_id, new_status]
            );
            return { status: 'Success', pesan: 'Status berhasil diperbarui' };
        } catch (err) {
            console.error("Error di Repo DetailTask (UpdateStatus):", err.message);
            throw err;
        }
    }
}

module.exports = DetailTaskRepo;