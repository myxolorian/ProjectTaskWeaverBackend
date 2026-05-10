class EnrollmentModel {

    constructor() {
        this.group_id = null;
        this.user_id = null;
        this.user_role = null;
      
    }

    fillFromDb(row) {
        if (!row) return;

        this.group_id = row.group_id;
        this.user_id = row.user_id;
        this.user_role = row.user_role ;
    }
}

module.exports = EnrollmentModel;