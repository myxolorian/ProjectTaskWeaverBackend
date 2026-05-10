const { pool } = require('../config/db'); 
const UserModel = require('../model/UserModel');

class AuthRepo {

    static async registerUserInDB(fullName, password, email, phoneNumber) {
        try {
            const query = `SELECT status, message FROM register_user($1, $2, $3, $4)`;
            const values = [fullName, password, email, phoneNumber || null];

            const result = await pool.query(query, values);

            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status, 
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo (Register):", err.message);
            throw err;
        }
    }

    static async loginUserInDB(email, password) {
        try {
            const query = `SELECT user_id, user_email, user_full_name, user_phone_number FROM login_user($1, $2)`;
            const values = [email, password];

            const result = await pool.query(query, values);

            let userData = null;

            const isSuccess = result.rows.length > 0;

            if (isSuccess) {
                const dataMentah = result.rows[0];

                userData = new UserModel();
                userData.fillFromDb(dataMentah);
            }

            return {
                isSuccess: isSuccess,
                data: userData
            };
        } catch (err) {
            console.error("Error di Repo (Login):", err.message);
            throw err;
        }
    }
}

module.exports = AuthRepo;