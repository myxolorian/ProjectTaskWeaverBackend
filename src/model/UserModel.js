class UserModel {

    constructor() {
        this.Password = null;
        this.UserFullName = null;
        this.UserEmail = null;
        this.UserPhoneNumber = null;
        this.UserID = null;
        this.user_skill = null;
    }

    fillFromDb(row) {
        if (!row) return;

        this.UserID = row.user_id;
        this.UserEmail = row.user_email;
        this.UserFullName = row.user_full_name;
        this.UserPhoneNumber = row.user_phone_number;
        this.user_skill = row.user_skill;
    }
}

module.exports = UserModel;
