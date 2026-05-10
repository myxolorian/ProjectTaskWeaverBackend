const AuthService = require('../service/AuthService');

class AuthController {
   
    static async register(req, res) {
        const { fullName, password, email, phoneNumber } = req.body;

        try {
            const result = await AuthService.register(fullName, password, email, phoneNumber);

            if (result.isSuccess) {
                res.status(201).json({
                    status: "sukses",
                    pesan: result.pesan
                });
            } else {
                res.status(400).json({
                    status: "gagal",
                    pesan: result.pesan
                });
            }
        } catch (err) {
            console.error("❌ Error di Controller (Register):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
           
            const result = await AuthService.login(email, password);

            if (result.isSuccess) {
                res.json({
                    status: "sukses",
                    pesan: result.pesan,
                    data: result.data 
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