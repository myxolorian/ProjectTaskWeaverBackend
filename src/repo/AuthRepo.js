const { pool } = require('../config/db'); 
const UserModel = require('../model/UserModel');
const SkillModel = require('../model/SkillModel');
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
            const query = `SELECT user_id, user_email, user_full_name, user_phone_number, user_skill FROM login_user($1, $2)`;
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

    static async UpdatePassword(user_id, old_password, new_password) {
        try {
            const query = `SELECT status, message FROM update_user_password($1, $2, $3)`;
            const values = [user_id, old_password, new_password];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo User", err.message);
            throw err;
        }
    }

    static async InsertSkill(user_id, user_skill) {
        try {
            const query = `SELECT status, message FROM insert_user_skill($1, $2)`;
            const values = [user_id, user_skill];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo User", err.message);
            throw err;
        }
    }

    static async UpdateSkill(user_id, user_skill) {
        try {
            const query = `SELECT status, message FROM update_user_skill($1, $2)`;
            const values = [user_id, user_skill];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo User", err.message);
            throw err;
        }
    }

    static async GetSkill(user_id) {
        try {
            const query = `SELECT status, message, user_skill FROM get_user_skill($1)`;
            const result = await pool.query(query, [user_id]);
            const responsDariSP = result.rows[0];

            const isSuccess = responsDariSP.status === 'Success';

            let skillData = null;
            if (isSuccess) {
                skillData = new SkillModel();
                skillData.fillFromDb(responsDariSP);
            }

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message,
                data: skillData
            };
        } catch (err) {
            console.error("Error di Repo User", err.message);
            throw err;
        }
    }



    static async UpdateUser(user_id, full_name, user_email, phone_number) {
        try {
            const query = `SELECT status, message FROM update_user($1, $2, $3, $4)`;
            const values = [user_id, full_name, user_email, phone_number];

            const result = await pool.query(query, values);
            const responsDariSP = result.rows[0];

            return {
                status: responsDariSP.status,
                pesan: responsDariSP.message
            };
        } catch (err) {
            console.error("Error di Repo User", err.message);
            throw err;
        }
    }


}

module.exports = AuthRepo;