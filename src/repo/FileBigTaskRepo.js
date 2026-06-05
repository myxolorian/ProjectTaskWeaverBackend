const { pool } = require('../config/db');
const FileBigTaskModel = require('../model/FileBigTaskModel');

class FileBigTaskRepo {
    static async InsertFileBigTask(task_id, file_name, file_url) {
        try {
            const query = `SELECT status, message FROM insert_file_bigtask($1, $2, $3)`;
            const result = await pool.query(query, [task_id, file_name, file_url]);
            const row = result.rows[0];
            return { status: row.status, pesan: row.message };
        } catch (err) {
            console.error("Error di Repo FileBigTask (Insert):", err.message);
            throw err;
        }
    }

    static async GetFileBigTaskByTask(task_id) {
        try {
            const result = await pool.query(`SELECT * FROM get_file_bigtask_by_task($1)`, [task_id]);
            return result.rows.map(r => { const m = new FileBigTaskModel(); m.fillFromDb(r); return m; });
        } catch (err) {
            console.error("Error di Repo FileBigTask (GetByTask):", err.message);
            throw err;
        }
    }

    static async GetFileBigTaskByGroup(group_id) {
        try {
            const result = await pool.query(`SELECT * FROM get_file_bigtask_by_group($1)`, [group_id]);
            return result.rows.map(r => { const m = new FileBigTaskModel(); m.fillFromDb(r); return m; });
        } catch (err) {
            console.error("Error di Repo FileBigTask (GetByGroup):", err.message);
            throw err;
        }
    }

    static async DeleteFileBigTask(file_id) {
        try {
            const query = `SELECT status, message FROM delete_file_bigtask($1::bigint)`;
            const result = await pool.query(query, [file_id]);
            const row = result.rows[0];
            return { status: row.status, pesan: row.message };
        } catch (err) {
            console.error("Error di Repo FileBigTask (Delete):", err.message);
            throw err;
        }
    }
}

module.exports = FileBigTaskRepo;
