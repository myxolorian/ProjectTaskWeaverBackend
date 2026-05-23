class ChannelModel {

    constructor() {
        this.channel_id = null;
        this.channel_name = null;
        this.group_id = null;
        this.creator = null;
    }

    fillFromDb(row) {
        if (!row) return;

        this.group_id = row.group_id;
        this.creator = row.user_id;
        this.channel_name = row.channel_name;
        this.channel_id = row.channel_id;
    }
}

module.exports = ChannelModel;