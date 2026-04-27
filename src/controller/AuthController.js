const AuthService = require('../service/AuthService');

class AuthController {
   

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Panggil Service
            const result = await AuthService.login(email, password);

            // Evaluasi balasan dari Service
            if (result.isSuccess) {
                res.json({
                    status: "sukses",
                    pesan: result.pesan,
                    data: result.data // Ini isinya UserModel yang udah rapi!
                });
            } else {
                res.status(401).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
        }
    }
}

module.exports = AuthController;