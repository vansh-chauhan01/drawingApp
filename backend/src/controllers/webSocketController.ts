import { WebSocketServer , WebSocket } from "ws"

export const handleWebSocket = (wss : WebSocketServer)=>{
    wss.on("connection" , (socket : WebSocket)=>{

    })
}