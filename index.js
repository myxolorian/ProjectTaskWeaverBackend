    const express = require('express');
    const cors = require('cors');
    const { getConnection } = require('./src/config/db.js'); 
    const frontEndUrl = 'http://localhost:5173'; 
    const AuthController = require('./src/controller/AuthController'); 
    const GroupController = require('./src/controller/GroupController');// tambahin disini setiap kali buat controller baru
    const TaskController = require('./src/controller/TaskController');
    const ChannelController = require('./src/controller/ChannelController');
    const ChatController = require('./src/controller/ChatController');

    const app = express();
    const port = 3000;

    app.use(cors({
    origin: frontEndUrl, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
    }));

    app.use(express.json());

    getConnection();

    // AUTH 
    app.post('/api/register', AuthController.register);
    app.post('/api/login', AuthController.login);


    //GROUP
    app.post('/api/groupCreate', GroupController.InsertGroup);
    app.post('/api/groupJoin', GroupController.JoinGroup);
    app.post('/api/groupKick', GroupController.KickGroup);  
    app.post('/api/groupGet', GroupController.GetGroup);
    app.post('/api/groupGetMember', GroupController.GetMember);
    app.post('/api/groupGetInviteCode', GroupController.GetInviteCode);
    app.post('/api/groupGetGroupbyInviteCode', GroupController.GetGroupbyInviteCode);
    app.post('/api/groupGetGroupByUserId', GroupController.GetGroupByUserID)



    //TASK
    app.post('/api/taskCreate', TaskController.InsertTask);
    app.post('/api/taskUpdate', TaskController.UpdateTask);
    app.post('/api/taskDelete', TaskController.DeleteTask);
    app.post('/api/taskUpdateStatus', TaskController.UpdateTaskStatus);
    app.post('/api/taskGetByGroup', TaskController.GetTasksByGroup);
    app.post('/api/taskGetById', TaskController.GetTaskById);
    app.post('/api/taskGetByUser', TaskController.GetTasksByUser);

    //Channel
    app.post('/api/channelCreate', ChannelController.createChannel);


    //Chat
    app.post('/api/chatSend', ChatController.sendChat);



    app.get('/', (req, res) => {
        res.send('Backend TaskWeaver (Supabase Version) berjalan!');
    });


    app.listen(port, () => {
        console.log(`🚀 Server TaskWeaver jalan di port ${port}`);
        console.log(`🔗 Coba akses: http://localhost:${port}`);
    });