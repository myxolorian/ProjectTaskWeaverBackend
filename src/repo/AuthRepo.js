const { sql, getConnection } = require('../config/db');
const UserModel = require('../model/UserModel'); // Wajib panggil cetakan Model lu

class AuthRepo {

   
    static async registerUserInDB(fullName, password, email, phoneNumber) {
        try {
            const pool = await getConnection();
            const request = pool.request();

            request.input('FullName', sql.VarChar(100), fullName);
            request.input('Password', sql.VarChar(100), password);
            request.input('Email', sql.VarChar(50), email);
            request.input('PhoneNumber', sql.VarChar(20), phoneNumber || null);

            const result = await request.execute('RegisterUser');

            const responsDariSP = result.recordset[0];

            return {
                status: responsDariSP.Status,
                pesan: responsDariSP.Message
            };
        } catch (err) {
            console.error("❌ Error di Repo (Register):", err.message);
            throw err;
        }
    }

   
    static async loginUserInDB(email, password) {
        try {
            const pool = await getConnection();
            const request = pool.request();

            request.input('Email', sql.VarChar(50), email);
            request.input('Password', sql.VarChar(100), password);

            const result = await request.execute('LoginUser');

            const flag = result.returnValue;
            let userData = null;

            if (flag === 1 && result.recordset.length > 0) {
                const dataMentah = result.recordset[0];

                userData = new UserModel();

                userData.id = dataMentah.UserID;
                userData.email = dataMentah.UserEmail;
                userData.statusLogin = dataMentah.StatusLogin;
            }

            return {
                isSuccess: flag === 1,
                data: userData
            };
        } catch (err) {
            console.error("❌ Error di Repo (Login):", err.message);
            throw err;
        }
    }
}

module.exports = AuthRepo;