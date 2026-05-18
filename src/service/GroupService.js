const GroupRepo = require('../repo/GroupRepo');
const crypto = require('crypto');
class GroupService {

    static async InsertGroup(groupName, userId, group_description) {
        if (!groupName || !userId) {
            return { isSuccess: false, pesan: 'Nama Grup dan ID Pengguna wajib diisi!' };
        }

        try {
            const invite_code = crypto.randomBytes(3).toString('hex').toUpperCase(); 

            const result = await GroupRepo.InsertGroup(groupName, userId, invite_code, group_description);

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

    static async KickGroup(group_id, user_id, requester_user_id) {
        if (!group_id || !user_id || !requester_user_id) {
            return { isSuccess: false, pesan: 'ID grup, ID Pengguna, dan ID Peminta wajib diisi!' };
        }

        try {
            const result = await GroupRepo.KickGroup(group_id, user_id, requester_user_id);
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

    static async GetGroup(group_id) {
        try {
            const data = await GroupRepo.GetGroup(group_id);

            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }
    }


    static async GetMember(group_id) {
        try {
            const data = await GroupRepo.GetMember(group_id);

            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }
    }

    static async GetInviteCode(group_id) {
        try {
            const data = await GroupRepo.GetInviteCode(group_id);

            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }

    }


    static async GetGroupbyInviteCode(invite_code) {
        try {
            const data = await GroupRepo.GetGroupbyInviteCode(invite_code);

            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service Group:", err.message);
            throw err;
        }

    }

}

module.exports = GroupService;