import type { Request , Response } from "express"
import { prisma } from "../db_init.js";

export const getChats = async(req : Request , res : Response)=>{
    try{
        const roomId = Number(req.params.roomId);

        if(!roomId){
            return res.status(500)
        }

        const chats = await prisma.chat.findMany({
            where : {
                roomId : roomId
            },
            orderBy : {
                id : "desc"
            },
            take : 1000
        })

        return res.json(chats)
    }catch(e){
        return res.status(500).json({
            message : "couldnt fetch messages"
        })
    }
}

export const deleteChats = async(req : Request , res : Response)=>{
    try{
        console.log("params : " + req.params.roomId);
        const roomId = Number(req.params.roomId);

        if(!roomId){
            return res.status(500)
        }
       

        await prisma.chat.deleteMany({
            where : {
                roomId : roomId
            }
        })

        return res.status(200).json({
            message : "deleted all shapes"
        })


    }catch(e){
        return res.status(500).json({
            message : "couldnt delete shapes"
        })
    }
}
