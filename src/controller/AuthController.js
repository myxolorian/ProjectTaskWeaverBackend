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


    static async UpdatePassword(req, res) {
        const { user_id, old_password, new_password } = req.body;
        try {
            const result = await AuthService.UpdatePassword(user_id, old_password, new_password);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller (User):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


    static async InsertUpdateUserSkill(req, res) {
        const { user_id, user_skill } = req.body;
        try {
            const result = await AuthService.InsertUpdateUserSkill(user_id, user_skill);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", pesan: result.pesan });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller (User):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }

    static async GetSkill(req, res) {
        const { user_id } = req.body;
        try {
            const result = await AuthService.GetSkill(user_id);
            if (result.isSuccess) {
                res.status(200).json({ status: "sukses", user_skill: result.user_skill });
            } else {
                res.status(400).json({ status: "gagal", pesan: result.pesan });
            }
        } catch (err) {
            console.error("Error di Controller (User):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server" });
        }
    }


}

module.exports = AuthController;