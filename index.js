import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws'
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log("Client is Connected!!");

  ws.on('message', (message) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  })
})

wss.on('close', () => {
  console.log("Client is closed!!!");
  
})

server.listen(3000, () => console.log('Server running on http://localhost:3000'));