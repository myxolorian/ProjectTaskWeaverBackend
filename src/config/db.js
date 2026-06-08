require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

async function getConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to Supabase PostgreSQL!');
        client.release();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}

module.exports = { pool, getConnection };