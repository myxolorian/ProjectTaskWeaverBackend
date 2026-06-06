require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const { getConnection } = require('./src/config/db.js');
const { initSocket } = require('./src/config/socket.js');
const frontEndUrl = 'http://localhost:5173';

const AuthController = require('./src/controller/AuthController');
const GroupController = require('./src/controller/GroupController');
const TaskController = require('./src/controller/TaskController');
const ChannelController = require('./src/controller/ChannelController');
const ChatController = require('./src/controller/ChatController');
const DetailTaskController = require('./src/controller/DetailTaskController');
const AIController = require('./src/controller/AIController');
const DetailTaskFileController = require('./src/controller/DetailTaskFileController');
const ActivityController = require('./src/controller/ActivityController');
const FileBigTaskController = require('./src/controller/FileBigTaskController');

const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

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
// app.post('/api/userDISkill', AuthController.DeleteSkill); 
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

// DETAIL TASK
app.post('/api/detailTaskInsert', DetailTaskController.InsertDetailTask);
app.post('/api/detailTaskGetByUser', DetailTaskController.GetDetailTasksByUser);
app.post('/api/detailTaskGetByTask', DetailTaskController.GetDetailTasksByTask);
app.post('/api/detailTaskGetByGroup', DetailTaskController.GetDetailTasksByGroup);
app.post('/api/detailTaskUpdateStatus', DetailTaskController.UpdateDetailTaskStatus);

// CHANNEL
app.post('/api/channelCreate', ChannelController.createChannel);
app.post('/api/channelGetByGroup', ChannelController.GetChannelByGroupId);
app.post('/api/channelDelete', ChannelController.DeleteChannel);
app.post('/api/channelUpdate', ChannelController.UpdateChannel);

// CHAT
app.post('/api/chatSend', ChatController.sendChat);
app.post('/api/chatGet', ChatController.GetChat);
app.post('/api/chatDelete', ChatController.DeleteChat);
app.post('/api/chatUpdate', ChatController.UpdateChat);

// AI
app.post('/api/taskBreakdown', AIController.BreakdownTask);
app.post('/api/taskRebalance', AIController.RebalanceTask);
app.post('/api/groupRebalance', AIController.RebalanceGroup)

// DETAIL TASK FILE
app.post('/api/insertTaskFile', upload.single('file'), DetailTaskFileController.UploadFile);
app.post('/api/getTaskFilesByGroup', DetailTaskFileController.GetFilesByGroup);
app.post('/api/getTaskFileByCategory', DetailTaskFileController.GetFilesByCategory);
app.post('/api/deleteTaskFile', DetailTaskFileController.DeleteFile);

// BIG TASK FILE
app.post('/api/insertBigTaskFile', upload.single('file'), FileBigTaskController.UploadFile);
app.post('/api/getBigTaskFilesByTask', FileBigTaskController.GetFilesByTask);
app.post('/api/getBigTaskFilesByGroup', FileBigTaskController.GetFilesByGroup);
app.post('/api/deleteBigTaskFile', FileBigTaskController.DeleteFile);

//activity
app.post('/api/getActivityByGroup', ActivityController.GetActivity);
app.post('/api/activityCreate', ActivityController.CreateActivity);

app.get('/', (req, res) => {
    res.send('Backend TaskWeaver (Supabase Version) berjalan!');
});

const server = http.createServer(app);
const io = initSocket(server);
app.set('io', io); 

server.listen(port, () => {
    console.log(`Server TaskWeaver jalan di port ${port}`);
    console.log(`Coba akses: http://localhost:${port}`);
});