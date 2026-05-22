const TaskRepo = require('../repo/TaskRepo');

class TaskService {

    static async InsertTask(Group_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId) {
        if (!Group_Id || !TaskName || !TaskDescription || !TaskComplexity || !TaskDeadline || !CreatorId) {
            return { isSuccess: false, pesan: 'Semua informasi harus diisi!' };
        }

        try {
            const result = await TaskRepo.InsertTask(Group_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite, CreatorId);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }

    static async UpdateTask(Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite) {
        if (!Task_Id || !TaskName || !TaskDescription || !TaskComplexity || !TaskDeadline) {
            return { isSuccess: false, pesan: 'Minimal update satu informasi!' };
        }

        try {
            const result = await TaskRepo.UpdateTask(Task_Id, TaskName, TaskDescription, TaskComplexity, TaskDeadline, TaskPrerequisite);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }

    static async DeleteTask(Task_Id, requester_user_Id) {
        if (!Task_Id || !requester_user_Id) {
            return { isSuccess: false, pesan: 'Semua informasi harus diisi!' };
        }

        try {
            const result = await TaskRepo.DeleteTask(Task_Id, requester_user_Id);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }





    static async UpdateTaskStatus(Task_Id, NewStatus, requester_user_Id) {
        if (!Task_Id || !NewStatus || !requester_user_Id) {
            return { isSuccess: false, pesan: 'Semua informasi harus diisi!' };
        }

        try {
            const result = await TaskRepo.UpdateTaskStatus(Task_Id, NewStatus, requester_user_Id);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }

    static async GetTasksByGroup(Group_Id) {
        if (!Group_Id) {
            return { isSuccess: false, pesan: 'Group_Id harus diisi!' };
        }

        try {
            const data = await TaskRepo.GetTasksByGroup(Group_Id);
            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }

    static async GetTaskById(Task_Id) {
        if (!Task_Id) {
            return { isSuccess: false, pesan: 'Task_Id harus diisi!' };
        }

        try {
            const data = await TaskRepo.GetTaskById(Task_Id);

            if (data) {
                return { isSuccess: true, data: data };
            } else {
                return { isSuccess: false, pesan: 'Task tidak ditemukan' };
            }
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }

    static async GetTasksByUser(User_Id) {
        if (!User_Id) {
            return { isSuccess: false, pesan: 'User_Id harus diisi!' };
        }

        try {
            const data = await TaskRepo.GetTasksByUser(User_Id);
            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Task:", err.message);
            throw err;
        }
    }
}

module.exports = TaskService;