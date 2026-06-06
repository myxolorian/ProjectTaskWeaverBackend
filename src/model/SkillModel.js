class SkillModel {
   
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