class UserModel {

    constructor() {
        this.Password = null;
        this.UserFullName = null;
        this.UserEmail = null;
        this.UserPhoneNumber = null;
        this.UserID = null;
    }

    fillFromDb(row) {
        if (!row) return;

        // 🔥 Mapping dari output snake_case PostgreSQL ke PascalCase Model lu
        this.UserID = row.user_id;
        this.UserEmail = row.user_email;
        this.UserFullName = row.user_full_name;
        this.UserPhoneNumber = row.user_phone_number;
    }
}

module.exports = UserModel;