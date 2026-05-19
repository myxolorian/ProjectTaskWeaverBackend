class GroupModel {
    //data disini sesuai dengan di database, jadi harus sesuai dengan yang di select di repo


    constructor() {
        this.group_id = null;
        this.group_name = null;
        this.group_description = null;
        this.group_invite_code = null;
    }

    fillFromDb(row) {
        if (!row) return;
        this.group_id = row.group_id;
        this.group_name = row.group_name;
        this.group_description = row.group_description;
        this.group_invite_code = row.invite_code;
    }
}

module.exports = GroupModel;