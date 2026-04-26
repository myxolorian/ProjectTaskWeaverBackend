const express = require('express');
const connectDB = require('./db'); // Memanggil file db.js
const app = express();
const port = 3000;
const sql = require('mssql')

// Jalankan fungsi koneksi database
connectDB();

// ----------------------------------------------------
// DAFTAR ENDPOINT / API
// ----------------------------------------------------

// Endpoint 1: Jalur Utama (Biasanya untuk cek status server)
app.get('/', (req, res) => {
    res.send('Backend TaskWeaver berjalan!');
});

// Endpoint 2: Jalur untuk mengetes respon JSON
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
        // Jalankan perintah (query) SQL Server
        // Ganti 'Tasks' dengan nama tabel yang kamu buat di SSMS
        const result = await sql.query('SELECT * FROM Tasks'); 
        
        // Kirim hasilnya ke frontend dalam format JSON
        res.json({
            status: "sukses",
            data: result.recordset // .recordset adalah tempat data aslinya berada
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
});
// Nanti Endpoint 3, 4, 5, dst bisa ditambahkan di bawah sini...



app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});