import express from "express";
import { prisma } from "./db_init.js"
import userRouter from "./routers/userRouter.js"
import  dotenv  from "dotenv";
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { handleWebSocket } from "./controllers/webSocketController.js";


dotenv.config();


const app = express();



const server = createServer(app);

const wss =  new WebSocketServer({ server });

app.use(express.json());
handleWebSocket(wss);

app.get("/" , (req , res)=>{
    return res.json({
        message : "working"
    })
})


const start = async()=>{
    try{
        await prisma.$connect();
        console.log("database connected");

        server.listen(8800 , async()=>{
            console.log("listening on port 8800");
        });


    }catch(e){
        console.log("error connecting to db" ,e);
    }
}


app.use("/api/v1/user" , userRouter);

start();

