const express = require('express');
const connectDB = require('./src/config/db.js');
const app = express();
const port = 3000;
const sql = require('mssql/msnodesqlv8');

// Jalankan fungsi koneksi database
connectDB();

// ----------------------------------------------------
// DAFTAR ENDPOINT / API
// ----------------------------------------------------

app.get('/', (req, res) => {
    res.send('Backend TaskWeaver berjalan!');
});

app.get('/api/test-data', (req, res) => {
    res.json({
        status: "sukses",
        pesan: "Backend berhasil merespons!",
        data: [
            { id: 1, nama_tugas: "Belajar Node.js" },
            { id: 2, nama_tugas: "Koneksi Database" }
        ]
    });
});

app.get('/api/tasks', async (req, res) => {
    try {
        // Nama tabel disesuaikan dengan yang ada di SSMS kamu
        const result = await sql.query('SELECT * FROM trTask');

        res.json({
            status: "sukses",
            data: result.recordset
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
});

app.listen(port, () => {
    // Teks ini yang bakal muncul kalau server berhasil nyala
    console.log(`🚀 Berhasil di run! Server jalan di port ${port}`);
});