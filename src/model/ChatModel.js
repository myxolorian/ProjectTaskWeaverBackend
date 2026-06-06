class ChatModel {

    constructor() {
        this.chat_id = null;
        this.group_id = null;
        this.user_id = null;
        this.channel_id = null;
        this.chat_message = null;
        this.user_full_name = null;  
        this.audited_activity = null;
        this.audited_time = null;
    }

    fillFromDb(row) {
        if (!row) return;

        this.chat_id = row.chat_id;
        this.group_id = row.group_id;
        this.user_id = row.user_id;
        this.channel_id = row.channel_id;
        this.chat_message = row.chat_message;
        this.user_full_name = row.user_full_name;  
        this.audited_activity = row.audited_activity;
        this.audited_time = row.audited_time;
    }
}

module.exports = ChatModel;