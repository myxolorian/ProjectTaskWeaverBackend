const sql = require('mssql/msnodesqlv8');

const config = {
    server: '.', 
    database: 'TaskWeaverDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

let pool; // Variabel untuk menyimpan koneksi biar nggak buka-tutup terus

// Fungsi ini yang akan dipanggil oleh Repo nanti
async function getConnection() {
    try {
        // Kalau belum terhubung, hubungkan. Kalau sudah, pakai yang ada.
        if (!pool) {
            pool = await sql.connect(config);
            console.log('✅ PINTU DATABASE DIBUKA OLEH CONFIG!');
        }
        return pool;
    } catch (err) {
        console.error('❌ GAGAL MASUK:', err.message);
        throw err;
    }
}

// Ekspor alatnya (sql) dan kunci pintunya (getConnection)
module.exports = { sql, getConnection };