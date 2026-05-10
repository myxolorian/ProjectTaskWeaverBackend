class TaskModel {
    //data disini sesuai dengan di database, jadi harus sesuai dengan yang di select di repo


    constructor() {
        this.Group_Id = null;
        this.TaskName = null;
        this.TaskDescription = null;
        this.TaskComplexity = null;
        this.TaskDeadline = null;
        this.TaskPrerequisite = null;
        this.TaskId = null;

    }

    fillFromDb(row) {
        if (!row) return;
        this.Group_Id = row.group_id;
        this.TaskName = row.task_title;
        this.TaskDescription = row.task_description;
        this.TaskComplexity = row.complexity_score;
        this.TaskDeadline = row.deadline;
        this.TaskPrerequisite = row.prerequisite_task_id;
        this.TaskId = row.task_id;
    }
}

module.exports = TaskModel;