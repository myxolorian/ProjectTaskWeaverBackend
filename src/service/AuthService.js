const AuthRepo = require('../repo/AuthRepo');

class AuthService {




    static async login(email, password) {
        if (!email || !password) {
            return { isSuccess: false, pesan: 'Email dan Password wajib diisi!' };
        }

        // Suruh Repo ngecek ke Database
        const result = await AuthRepo.loginUserInDB(email, password);

        // Olah balasan dari Repo
        if (result.isSuccess) {
            return { isSuccess: true, pesan: 'Login berhasil!', data: result.data };
        } else {
            return { isSuccess: false, pesan: 'Email atau Password salah!' };
        }
    }
}

module.exports = AuthService;