const DetailTaskRepo = require('../repo/DetailTaskRepo');
 
class DetailTaskService {
 
    static async InsertDetailTask(task_id, user_id, detail_task_name, detail_task_deadline) {
        if (!task_id || !user_id || !detail_task_name || !detail_task_deadline) {
            return { isSuccess: false, pesan: 'Semua field wajib diisi!' };
        }
        try {
            const result = await DetailTaskRepo.InsertDetailTask(task_id, user_id, detail_task_name, detail_task_deadline);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service DetailTask (Insert):", err.message);
            throw err;
        }
    }
 
    static async GetDetailTasksByUser(user_id) {
        if (!user_id) return { isSuccess: false, pesan: 'user_id wajib diisi!' };
        try {
            const data = await DetailTaskRepo.GetDetailTasksByUser(user_id);
            return { isSuccess: true, data };
        } catch (err) {
            console.error("Error di Service DetailTask (GetByUser):", err.message);
            throw err;
        }
    }
 
    static async GetDetailTasksByTask(task_id) {
        if (!task_id) return { isSuccess: false, pesan: 'task_id wajib diisi!' };
        try {
            const data = await DetailTaskRepo.GetDetailTasksByTask(task_id);
            return { isSuccess: true, data };
        } catch (err) {
            console.error("Error di Service DetailTask (GetByTask):", err.message);
            throw err;
        }
    }
 
    static async GetDetailTasksByGroup(group_id) {
        if (!group_id) return { isSuccess: false, pesan: 'group_id wajib diisi!' };
        try {
            const data = await DetailTaskRepo.GetDetailTasksByGroup(group_id);
            return { isSuccess: true, data };
        } catch (err) {
            console.error("Error di Service DetailTask (GetByGroup):", err.message);
            throw err;
        }
    }
 
    static async UpdateDetailTaskStatus(detail_task_id, new_status) {
        if (!detail_task_id || !new_status) return { isSuccess: false, pesan: 'detail_task_id dan new_status wajib diisi!' };
        try {
            const result = await DetailTaskRepo.UpdateDetailTaskStatus(detail_task_id, new_status);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service DetailTask (UpdateStatus):", err.message);
            throw err;
        }
    }
}
 
module.exports = DetailTaskService;