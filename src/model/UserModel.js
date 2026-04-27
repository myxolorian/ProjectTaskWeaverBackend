class UserModel {
   
    constructor() {       
        this.Password = null;
        this.UserFullName = null;
        this.UserEmail = null;
        this.UserPhoneNumber = null;
    }

    fillFromDb(row) {
      if (!row) return;
      this.UserEmail = row.UserEmail;
      this.StatusLogin = row.StatusLogin;
      this.UserFullName = row.UserFullName;
      this.UserPhoneNumber = row.UserPhoneNumber;
  }
}

module.exports = UserModel;