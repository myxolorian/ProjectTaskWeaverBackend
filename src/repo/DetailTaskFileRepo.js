const { pool } = require('../config/db');
const DetailTaskFileModel = require('../model/DetailTaskFileModel');

class DetailTaskFileRepo {
    static async InsertDetailTaskFile(detail_task_id, uploaded_by, file_name, file_url, group_id, file_category) {
        try {
            const query = `SELECT status, message FROM insert_task_file($1, $2, $3, $4, $5, $6)`;
            const values = [detail_task_id, uploaded_by, file_name, file_url, group_id, file_category];

            const result = await pool.query(query, values);
            const row = result.rows[0];

            return { status: row.status, pesan: row.message };
        } catch (err) {
            console.error("Error di Repo TaskFile (Insert):", err.message);
            throw err;
        }
    }

    static async GetTaskFilesByGroup(group_id) {
        try {
            const query = `SELECT * FROM get_task_files_by_group($1)`;
            const result = await pool.query(query, [group_id]);

            return result.rows.map(row => {
                const model = new DetailTaskFileModel();
                model.fillFromDb(row);
                return model;
            });
        } catch (err) {
            console.error("Error di Repo TaskFile (GetByGroup):", err.message);
            throw err;
        }
    }

    static async GetTaskFilesByCategory(group_id, file_category) {
        try {
            const query = `SELECT * FROM get_task_files_by_category($1, $2)`;
            const result = await pool.query(query, [group_id, file_category]);

            return result.rows.map(row => {
                const model = new DetailTaskFileModel();
                model.fillFromDb(row);
                return model;
            });
        } catch (err) {
            console.error("Error di Repo TaskFile (GetByCategory):", err.message);
            throw err;
        }
    }
}

module.exports = DetailTaskFileRepo;