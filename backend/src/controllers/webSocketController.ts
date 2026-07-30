import { WebSocketServer , WebSocket } from "ws"
import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import { prisma } from "../db_init.js";



interface User{
    ws : WebSocket,
    rooms : string[],
    userId : string,
} 

const users : User[] = [];



type jwtPayload = {
    id : string
}

function checkUser(cookieHeader : string | undefined) : string | null{
    if(!cookieHeader){    
        
        return null;
    }

        
    const cookies = cookie.parseCookie(cookieHeader)
    
    const token = cookies?.access_token

    if(!token){        
        return null;
    }
    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET!) as jwtPayload;
        return payload.id
    }catch(e){
        
        return null
    }
}

export const handleWebSocket = (wss : WebSocketServer)=>{
    wss.on("connection" , function connection(ws : WebSocket , request){
        // console.log("cookie is :" + request.headers.cookie);
        const cookieHeader = request.headers.cookie;
        const userId = checkUser(cookieHeader);
       

        if(!userId){
            ws.close();
            return;
        }

       
        users.push({
            ws,
            rooms : [],
            userId : userId
        })

        ws.on("message" , async function message(data){
            // i will get data like this {type : "join_room,leave,chat", roomId : "", message?}
            let parsedData;
            try{
                parsedData = JSON.parse(data.toString());
            }catch(e){
                return;
            }
            
            
            if(parsedData.type === 'join_room'){
                const user = users.find(x => x.ws == ws);
                if(!user) return;
                user?.rooms.push(parsedData.roomId);
            }

            if(parsedData.type === 'leave_room'){
                const user = users.find(x => x.ws == ws);
                if(!user) return;
                user.rooms = user?.rooms.filter(currRoom => currRoom !== parsedData.roomId);
            }

            if(parsedData.type === 'chat'){
                const roomId = parsedData.roomId;
                const message = parsedData.message;


                users.forEach(currUser => {
                    if(currUser.rooms.includes(roomId)){
                        currUser.ws.send(JSON.stringify({
                            type : "chat",
                            message : parsedData.message,
                            roomId
                        }))
                    }
                });


                await prisma.chat.create({
                    data : {
                        message : message,
                        roomId : Number(roomId),
                        userId : userId
                    }
                })

            }
        })

        ws.on("close" , ()=>{
            const ind = users.findIndex(currUser => currUser.ws === ws);
            if(ind !== -1){
                users.splice(ind , 1)
            }
        })
    })


}