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





}

module.exports = TaskService;