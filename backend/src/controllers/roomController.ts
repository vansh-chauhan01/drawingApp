import type {Request , Response} from "express";
import { roomSchema } from "../zodSchema/userSchema.js";
import { prisma } from "../db_init.js";


export const makeRoom = async(req : Request , res : Response)=>{
    try{
        const parsedData = roomSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message : parsedData.error.issues
            })
        }
        
        const { roomName } = parsedData.data;
        const id = req.userId;
        if(!id){
            return res.status(401).json({
                message : "you need to sign in to create room"
            })
        }
        const newRoom = await prisma.room.create({
            data : {
                name : roomName,
                adminId : id
            }
        })

        if(!newRoom){
            return res.status(411).json({
                message: "Room already exists with this name"
            })
        }

        return res.status(201).json({
            roomId : newRoom.id
        })
        

    }catch(e){
        return res.status(500).json({
            message : "room already exists with this name"
        })
    }
}


export const getRoom = async(req : Request , res : Response) =>{

    try{
        const roomName  = req.params.name as string;
        if(!roomName){
            return 
        }
        const room = await prisma.room.findUnique({
            where : {
                name : roomName,
            }
        })
        if(!room){
            return res.status(400).json({
                message : "room name is wrong"
            })
        }

        return res.status(201).json({
            room,
            message : "room fetched success"
        })
    }catch(e){
        return res.status(500).json({
            message : "couldnt fetch the room"
        })
    }
    
}




