const sql = require('mssql');

// Ganti data di bawah ini sesuai dengan yang kamu pakai saat login di SSMS
const config = {
    user: 'User', // Username default SQL Server (biasanya 'sa' / System Administrator)
    password: 'User123', // Masukkan passwordmu di sini
    server: 'localhost', // Atau gunakan nama servermu, contoh: 'localhost\\SQLEXPRESS'
    database: 'TaskWeaverDB', // Ganti dengan nama database yang kamu buat di SSMS
    options: {
        encrypt: false, 
        trustServerCertificate: true // Sangat penting agar Node.js mau connect ke database lokal
    }
};

// Fungsi untuk menyambungkan ke database
async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log('✅ Yey! Backend berhasil terhubung ke Microsoft SQL Server!');
        return pool;
    } catch (err) {
        console.error('❌ Gagal terhubung ke database. Cek lagi username/password-nya:', err);
    }
}

module.exports = connectDB;