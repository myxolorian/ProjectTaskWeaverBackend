const express = require('express');
const { getConnection } = require('./src/config/db.js');

const AuthController = require('./src/controller/AuthController'); 
const GroupController = require('./src/controller/GroupController'); // tambahin disini setiap kali buat controller baru
const app = express();
const port = 3000;

app.use(express.json());

getConnection();


app.post('/api/register', AuthController.register);
app.post('/api/login', AuthController.login);


///GROUP
app.post('/api/groupCreate', GroupController.InsertGroup);
app.post('/api/groupJoin', GroupController.JoinGroup);
app.post('/api/groupKick', GroupController.KickGroup);  
app.post('/api/groupGet', GroupController.GetGroup);
app.post('/api/groupGetMember', GroupController.GetMember);

app.get('/', (req, res) => {
    res.send('Backend TaskWeaver (Supabase Version) berjalan!');
});


app.listen(port, () => {
    console.log(`🚀 Server TaskWeaver jalan di port ${port}`);
    console.log(`🔗 Coba akses: http://localhost:${port}`);
});