    const GroupRepo = require('../repo/GroupRepo');
    const crypto = require('crypto');
    class GroupService {

        static async InsertGroup(groupName, userId, group_description, invite_code) {
            if (!groupName || !userId) {
                return { isSuccess: false, pesan: 'Nama Grup dan ID Pengguna wajib diisi!' };
            }

            try {
                // const invite_code = crypto.randomBytes(3).toString('hex').toUpperCase(); 

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
                const result = await GroupRepo.GetGroupbyInviteCode(invite_code);

                return result;
            } catch (err) {
                console.error("Error di Service Group:", err.message);
                throw err;
            }

        }



        static async GetGroupByUserID(user_id) {
            try {
                const result = await GroupRepo.GetGroupByUserID(user_id);

                return result;
            } catch (err) {
                console.error("Error di Service Group:", err.message);
                throw err;
            }

        }


        static async DeleteGroup(group_id, requester_user_id) {
            if (!group_id  || !requester_user_id) {
                return { isSuccess: false, pesan: 'ID grup, dan ID Peminta wajib diisi!' };
            }

            try {
                const result = await GroupRepo.DeleteGroup(group_id, requester_user_id);
                if (result.status === 'Success') {
                    return { isSuccess: true, pesan: result.pesan };
                } else {
                    return { isSuccess: false, pesan: result.pesan };
                }
            } catch (err) {
                console.error("Error di Service Group (DeleteGroup):", err.message);
                throw err;
            }
        }

        static async UpdateGroup(group_id, user_id, group_name, group_description) {
            if (!group_id || !user_id || !group_name) {
                return { isSuccess: false, pesan: 'group_id, user_id, dan group_name wajib diisi!' };
            }

            try {
                const result = await GroupRepo.UpdateGroup(group_id, user_id, group_name, group_description);
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