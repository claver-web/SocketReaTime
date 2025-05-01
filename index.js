import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// Local Moduls
// import route from './Routers/webRTC.router.js';
import ConnectionToWebRTC from './sockets/ConnectionWebRTC.js';

const app = express();
const server = http.createServer(app);

// WebRTC Connection 
ConnectionToWebRTC(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// All Routers are here :-
// app.use('/', route);

server.listen(3000, () => console.log('Server running on http://localhost:3000'));