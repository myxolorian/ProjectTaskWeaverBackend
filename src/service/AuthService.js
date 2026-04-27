const AuthRepo = require('../repo/AuthRepo');

class AuthService {

    static async register(fullName, password, email, phoneNumber) {
        // Validasi dasar
        if (!fullName || !password || !email) {
            return { isSuccess: false, pesan: 'Nama Lengkap, Email, dan Password wajib diisi!' };
        }

        try {
            // Suruh Repo eksekusi ke Database
            const result = await AuthRepo.registerUserInDB(fullName, password, email, phoneNumber);

            // Olah balasan dari Repo (berdasarkan return dari SP: 'Success' atau 'Error')
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan };
            } else {
                return { isSuccess: false, pesan: result.pesan }; // Biasanya ini kalau email sudah terdaftar
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