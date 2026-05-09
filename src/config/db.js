const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres.bxtiqeozrktaytqmjxef',
    host:'aws-1-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'WeaverISGOOD123B28',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

async function getConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to Supabase PostgreSQL!');
        client.release();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    }
}

module.exports = { pool, getConnection };