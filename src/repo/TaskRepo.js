const { pool } = require('../config/db');
const TaskModel = require('../model/TaskModel');

class TaskRepo {

    static async InsertTask(Group_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId) {
        try {
            const query = `SELECT status, message FROM insert_task($1, $2, $3, $4, $5, $6, $7)`;
            const values = [Group_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId ];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }

    static async UpdateTask(Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite) {
        try {
            const query = `SELECT status, message FROM update_task($1, $2, $3, $4, $5, $6)`;
            const values = [Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;

        }
    }

    static async DeleteTask(Task_Id, requester_user_Id) {
        try {
            const query = `SELECT status, message FROM delete_task($1, $2)`;
            const values = [Task_Id, requester_user_Id];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }

    static async UpdateTaskStatus(Task_Id, NewStatus, requester_user_Id) {
        try {
            const query = `SELECT status, message FROM update_task_status($1, $2, $3)`;
            const values = [Task_Id, NewStatus, requester_user_Id];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }
    static async GetTasksByGroup(Group_Id) {
        try {
            const query = `SELECT * FROM get_tasks_by_group($1)`;
            const result = await pool.query(query, [Group_Id]);

            return result.rows;
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }

    static async GetTaskById(Task_Id) {
        try {
            const query = `SELECT * FROM get_task_by_id($1)`;
            const result = await pool.query(query, [Task_Id]);

            return result.rows[0] || null;
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }

    static async GetTasksByUser(User_Id) {
        try {
            const query = `SELECT * FROM get_tasks_by_user($1)`;
            const result = await pool.query(query, [User_Id]);

            return result.rows;
        } catch (err) {
            console.error("Error di Repo Task", err.message);
            throw err;
        }
    }
}

module.exports = TaskRepo;