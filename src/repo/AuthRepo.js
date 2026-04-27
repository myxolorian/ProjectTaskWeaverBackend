const { sql, getConnection } = require('../config/db'); 

async function registerUserInDB(fullName, password, email, phoneNumber) {
    try {
        // 1. Panggil koneksinya langsung di sini! (Karena index.js ga kepake)
        const pool = await getConnection();

        // 2. Buat request menggunakan koneksi (pool) tersebut
        const request = pool.request();

        // 3. Masukkan data ke parameter Stored Procedure
        request.input('FullName', sql.VarChar(100), fullName);
        request.input('Password', sql.VarChar(100), password);
        request.input('Email', sql.VarChar(50), email);
        request.input('PhoneNumber', sql.VarChar(20), phoneNumber || null);

        // 4. Eksekusi Stored Procedure 'RegisterUser'
        const result = await request.execute('RegisterUser');

        return result.recordset[0];
    } catch (err) {
        console.error("Error di Repo:", err.message);
        throw err;
    }
}

module.exports = { registerUserInDB };