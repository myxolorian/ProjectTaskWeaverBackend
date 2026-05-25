    const express = require('express');
    const cors = require('cors');
    const { getConnection } = require('./src/config/db.js'); 
    const frontEndUrl = 'http://localhost:5173'; 
    const AuthController = require('./src/controller/AuthController'); 
    const GroupController = require('./src/controller/GroupController'); // tambahin disini setiap kali buat controller baru
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

    // User 
    app.post('/api/register', AuthController.register);
    app.post('/api/login', AuthController.login);
app.post('/api/userUISkill', AuthController.InsertSkill);
app.post('/api/userUpdateSkill', AuthController.UpdateSkill);
    app.post('/api/userUpdatePassword', AuthController.UpdatePassword); 
    app.post('/api/userGetSkill', AuthController.GetSkill); 
    app.post('/api/userUpdate', AuthController.UpdateUser);


//GROUP
    app.post('/api/groupCreate', GroupController.InsertGroup);
    app.post('/api/groupJoin', GroupController.JoinGroup);
    app.post('/api/groupKick', GroupController.KickGroup);  
    app.post('/api/groupGet', GroupController.GetGroup);
    app.post('/api/groupGetMember', GroupController.GetMember);
    app.post('/api/groupGetInviteCode', GroupController.GetInviteCode);
    app.post('/api/groupGetGroupbyInviteCode', GroupController.GetGroupbyInviteCode);
    app.post('/api/groupGetGroupByUserId', GroupController.GetGroupByUserID);
    app.post('/api/groupDelete', GroupController.DeleteGroup);
    app.post('/api/groupUpdate', GroupController.UpdateGroup); 
    app.post('/api/groupUpdateRole', GroupController.UpdateUserRole);

    //TASK
    app.post('/api/taskCreate', TaskController.InsertTask);
    app.post('/api/taskUpdate', TaskController.UpdateTask);
    app.post('/api/taskDelete', TaskController.DeleteTask);
    app.post('/api/taskUpdateStatus', TaskController.UpdateTaskStatus);
    app.post('/api/taskGetByGroup', TaskController.GetTasksByGroup);
    app.post('/api/taskGetById', TaskController.GetTaskById);
    app.post('/api/taskGetByUser', TaskController.GetTasksByUser);


    //CHANNEL
    app.post('/api/channelCreate', ChannelController.createChannel);
    app.post('/api/channelGetByGroup', ChannelController.GetChannelByGroupId); 
    app.post('/api/channelDelete', ChannelController.DeleteChannel); 
    app.post('/api/channelUpdate', ChannelController.UpdateChannel); 


    //CHAT
    app.post('/api/chatSend', ChatController.sendChat);
    //getChat by channel id and group id
    //delete chat by chat id
    //update chat by chat id, ini opsional lah ya
   

    app.get('/', (req, res) => {
        res.send('Backend TaskWeaver (Supabase Version) berjalan!');
    });


    app.listen(port, () => {
        console.log(`🚀 Server TaskWeaver jalan di port ${port}`);
        console.log(`🔗 Coba akses: http://localhost:${port}`);
    });