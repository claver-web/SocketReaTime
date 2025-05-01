import { WebSocketServer } from 'ws'

const ConnectionToWebRTC =  async (server) => {
    const ws = new WebSocketServer({ server });

  if (!ws) {
    console.error("WebSocket server not initialized");
    return;
  }
    
  ws.on('connection', (wss) => {
    console.log("Client connected.");
  
    ws.on('message', (message) => {
      ws.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      })
    })
  
    wss.on('close', () => {
      console.log("Client is closed!!!");
    });

  });

}

export default ConnectionToWebRTC;