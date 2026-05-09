const express = require('express');
const { getConnection } = require('./src/config/db.js');

// 🔥 1. IMPORT CONTROLLER AUTH
const AuthController = require('./src/controller/AuthController');

const app = express();
const port = 3000;

// 🔥 2. MIDDLEWARE WAJIB: Biar bisa baca JSON dari Postman
app.use(express.json());

// 🔥 3. TEST KONEKSI KE SUPABASE
// Ini bakal manggil fungsi di db.js buat mastiin pintu database kebuka
getConnection();

// ----------------------------------------------------
// DAFTAR ENDPOINT / API
// ----------------------------------------------------

// 🚀 ROUTE AUTH (Udah pake arsitektur Duwamish/N-Tier)
app.post('/api/register', AuthController.register);
app.post('/api/login', AuthController.login);

// 🛠️ ROUTE TESTING
app.get('/', (req, res) => {
    res.send('Backend TaskWeaver (Supabase Version) berjalan!');
});

// ----------------------------------------------------

app.listen(port, () => {
    console.log(`🚀 Server TaskWeaver jalan di port ${port}`);
    console.log(`🔗 Coba akses: http://localhost:${port}`);
});