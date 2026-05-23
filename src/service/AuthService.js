const AuthRepo = require('../repo/AuthRepo');

class AuthService {

    static async register(fullName, password, email, phoneNumber) {
        if (!fullName || !password || !email) {
            return { isSuccess: false, pesan: 'Nama Lengkap, Email, dan Password wajib diisi!' };
        }

        try {
            const result = await AuthRepo.registerUserInDB(fullName, password, email, phoneNumber);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("❌ Error di Service (Register):", err.message);
            throw err;
        }
    }


    static async login(email, password) {
        if (!email || !password) {
            return { isSuccess: false, pesan: 'Email dan Password wajib diisi!' };
        }

        const result = await AuthRepo.loginUserInDB(email, password);

        if (result.isSuccess) {
            return { isSuccess: true, pesan: 'Login berhasil!', data: result.data };
        } else {
            return { isSuccess: false, pesan: 'Email atau Password salah!' };
        }
    }


    static async UpdatePassword(user_id, old_password, new_password) {
        if (!user_id || !old_password || !new_password) {
            return { isSuccess: false, pesan: 'user_id, old_password, dan new_password wajib diisi!' };
        }
        try {
            const result = await AuthRepo.UpdatePassword(user_id, old_password, new_password);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service User:", err.message);
            throw err;
        }
    }

    static async InsertUpdateUserSkill(user_id, user_skill) {
        if (!user_id || !user_skill) {
            return { isSuccess: false, pesan: 'user_id dan user_skill wajib diisi!' };
        }
        try {
            const result = await AuthRepo.InsertUpdateUserSkill(user_id, user_skill);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service User:", err.message);
            throw err;
        }
    }

    static async GetSkill(user_id) {
        if (!user_id) {
            return { isSuccess: false, pesan: 'user_id wajib diisi!' };
        }
        try {
            const result = await AuthRepo.GetSkill(user_id);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan, user_skill: result.user_skill };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }
        } catch (err) {
            console.error("Error di Service User:", err.message);
            throw err;
        }
    }
}

module.exports = AuthService;