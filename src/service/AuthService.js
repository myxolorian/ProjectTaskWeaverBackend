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
}

module.exports = AuthService;