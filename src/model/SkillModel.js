class SkillModel {
    //data disini sesuai dengan di database, jadi harus sesuai dengan yang di select di repo


    constructor() {
        this.user_id = null;
        this.user_skill = null;

    }

    fillFromDb(row) {
        if (!row) return;
        this.user_id = row.user_id;
        this.user_skill = row.user_skill;
    }
}

module.exports = SkillModel;