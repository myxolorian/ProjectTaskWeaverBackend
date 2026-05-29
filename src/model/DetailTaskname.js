class DetailTaskModel {
    constructor() {
        this.DetailTaskId = null;
        this.TaskId = null;
        this.UserId = null;
        this.DetailTaskName = null;
        this.DetailTaskDeadline = null;
        this.DetailTaskStatus = null;
        this.PrerequisiteDetailTaskId = null;
        this.UserFullName = null; 
    }

    fillFromDb(row) {
        if (!row) return;
        this.DetailTaskId = row.detail_task_id;
        this.TaskId = row.task_id;
        this.UserId = row.user_id;
        this.DetailTaskName = row.detail_task_name;
        this.DetailTaskDeadline = row.detail_task_deadline;
        this.DetailTaskStatus = row.detail_task_status;
        this.PrerequisiteDetailTaskId = row.prerequisite_detail_task_id;
        this.UserFullName = row.user_full_name || row.assigned_user_name; 
    }
}

module.exports = DetailTaskModel;