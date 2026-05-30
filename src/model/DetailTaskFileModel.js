class DetailTaskFileModel {
    constructor() {
        this.file_id = null;
        this.detail_task_id = null;
        this.uploaded_by = null;
        this.uploader_name = null; 
        this.file_name = null;
        this.file_url = null;
        this.upload_time = null;
    }

    fillFromDb(row) {
        if (!row) return;
        this.file_id = row.file_id;
        this.detail_task_id = row.detail_task_id;
        this.uploaded_by = row.uploaded_by;
        this.uploader_name = row.uploader_name;
        this.file_name = row.file_name;
        this.file_url = row.file_url;
        this.upload_time = row.upload_time;
    }
}

module.exports = DetailTaskFileModel;