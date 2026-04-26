const sql = require('mssql/msnodesqlv8');

const config = {
    server: '.', // Pake titik (.) biar langsung lewat jalur VIP kayak SSMS
    database: 'TaskWeaverDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

async function connectDB() {
    console.log('⏳ Nyoba dobrak pintu pake jalur VIP (.) ...');
    try {
        const pool = await sql.connect(config);
        console.log('✅ ANJAY TEMBUS! Database terhubung bos!');
        return pool;
    } catch (err) {
        console.error('❌ GAGAL MASUK:', err.message);
    }
}

module.exports = connectDB;

