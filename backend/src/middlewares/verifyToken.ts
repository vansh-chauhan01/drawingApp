import jwt from "jsonwebtoken"
import type { Request , Response , NextFunction } from "express"


export const verifyToken = async(req : Request , res : Response, next : NextFunction )=>{
    try{
        const token = req.cookies.access_token;
        if(!token){
             return res.status(400).json({
                message : "user is not logged in"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id : string};

        if(!decoded){
            return res.status(400).json({
                message : "you have an wrong access token"
            })
        }

        const userId = decoded.id;
        // ts error it says that req object doesnt have this field so we will change types of this req object
        req.userId = userId;
        next();

    }catch(e){
        return res.status(400).json({
            message : "user is not logged in"
        })
    }
}