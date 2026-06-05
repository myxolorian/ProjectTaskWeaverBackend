const { Server } = require('socket.io');

const frontEndUrl = 'http://localhost:5173';

let io = null;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: frontEndUrl,
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('🔌 Socket connected:', socket.id);

        // Client masuk ke "room" channel saat membuka sebuah channel
        socket.on('joinChannel', ({ channel_id }) => {
            if (channel_id != null) socket.join(`channel:${channel_id}`);
        });

        // Client keluar dari room saat pindah channel / menutup chat
        socket.on('leaveChannel', ({ channel_id }) => {
            if (channel_id != null) socket.leave(`channel:${channel_id}`);
        });

        socket.on('disconnect', () => {
            console.log('🔌 Socket disconnected:', socket.id);
        });
    });

    return io;
}

function getIO() {
    if (!io) throw new Error('Socket.io belum diinisialisasi');
    return io;
}

module.exports = { initSocket, getIO };
