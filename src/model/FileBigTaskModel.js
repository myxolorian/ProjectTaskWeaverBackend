class FileBigTaskModel {
    constructor() {
        this.file_id = null;
        this.task_id = null;
        this.task_title = null;   // hanya terisi di get_by_group
        this.group_id = null;     // hanya terisi di get_by_group
        this.file_name = null;
        this.file_url = null;
        this.audited_time = null;
    }

    fillFromDb(row) {
        if (!row) return;
        this.file_id = row.file_id;
        this.task_id = row.task_id;
        this.task_title = row.task_title ?? null;
        this.group_id = row.group_id ?? null;
        this.file_name = row.file_name;
        this.file_url = row.file_url;
        this.audited_time = row.audited_time;
    }
}

module.exports = FileBigTaskModel;
