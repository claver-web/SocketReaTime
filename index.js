import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.json({success: "Working"});
});

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}:`, data);

        io.emit('message', {
            id: socket.id,
            text: data,
            timeStamp: Date.now()
        })
    })

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    })
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});