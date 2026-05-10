const GroupRepo = require('../repo/GroupRepo');

class GroupService {

    static async InsertGroup(groupName, userId) {
        if (!groupName || !userId) {
            return { isSuccess: false, pesan: 'Nama Grup dan ID Pengguna wajib diisi!' };
        }

        try {
            const result = await GroupRepo.InsertGroup(groupName, userId);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }
    }

    static async JoinGroup(group_id, user_id, user_role) {
        if (!group_id || !user_id) {
            return { isSuccess: false, pesan: 'ID grup dan ID Pengguna wajib diisi!' };
        }

        try {
            const result = await GroupRepo.JoinGroup(group_id, user_id, user_role);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }
    }





}

module.exports = GroupService;