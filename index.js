const express = require('express');
const connectDB = require('./src/config/db.js');
const sql = require('mssql/msnodesqlv8');

// 🔥 1. IMPORT CONTROLLER YANG UDAH KITA BIKIN
const AuthController = require('./src/controller/AuthController');

const app = express();
const port = 3000;

// 🔥 2. WAJIB ADA: Biar Express bisa ngebaca data JSON dari Postman / Frontend
app.use(express.json());

// Jalankan fungsi koneksi database
connectDB();

// ----------------------------------------------------
// DAFTAR ENDPOINT / API
// ----------------------------------------------------

// 🚀 ENDPOINT AUTHENTICATION (DUWAMISH / N-TIER)
app.post('/api/login', AuthController.login);


// 🛠️ ENDPOINT TEST BAWAAN LU (Biarin aja buat nge-test)
app.get('/', (req, res) => {
    res.send('Backend TaskWeaver berjalan!');
});

//app.get('/api/test-data', (req, res) => {
//    res.json({
//        status: "sukses",
//        pesan: "Backend berhasil merespons!",
//        data: [
//            { id: 1, nama_tugas: "Belajar Node.js" },
//            { id: 2, nama_tugas: "Koneksi Database" }
//        ]
//    });
//});

// Catatan: Endpoint ini masih nembak DB langsung. 
// Nanti kalau ada waktu lu bisa rapihin ini pindahin ke TaskController & TaskRepo ya!
//app.get('/api/tasks', async (req, res) => {
//    try {
//        const result = await sql.query('SELECT * FROM trTask');
//        res.json({
//            status: "sukses",
//            data: result.recordset
//        });
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
//    }
//});

// ----------------------------------------------------

app.listen(port, () => {
    console.log(`🚀 Berhasil di run! Server jalan di port ${port}`);
});