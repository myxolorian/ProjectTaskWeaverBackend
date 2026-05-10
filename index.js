const express = require('express');
const { getConnection } = require('./src/config/db.js');

const AuthController = require('./src/controller/AuthController'); 
const GroupController = require('./src/controller/GroupController');// tambahin disini setiap kali buat controller baru
const TaskController = require('./src/controller/TaskController');

const app = express();
const port = 3000;

app.use(express.json());

getConnection();


app.post('/api/register', AuthController.register);
app.post('/api/login', AuthController.login);
app.post('/api/groupCreate', GroupController.InsertGroup);
app.post('/api/groupJoin', GroupController.JoinGroup);
app.post('/api/taskCreate', TaskController.InsertTask);
app.post('/api/taskUpdate', TaskController.UpdateTask);
app.post('/api/taskDelete', TaskController.DeleteTask);

app.get('/', (req, res) => {
    res.send('Backend TaskWeaver (Supabase Version) berjalan!');
});


app.listen(port, () => {
    console.log(`🚀 Server TaskWeaver jalan di port ${port}`);
    console.log(`🔗 Coba akses: http://localhost:${port}`);
});