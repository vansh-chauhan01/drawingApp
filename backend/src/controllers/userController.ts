import type {Request , Response} from "express";
import {userSchemaSignUp , userSchemaSignIn} from "../zodSchema/userSchema.js";
import { prisma } from "../db_init.js"
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";



export const signup = async(req : Request , res : Response)=>{
    try{
        const result = userSchemaSignUp.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message : result.error.issues
            })
        }


        const {userName , password , email} = result.data;
        
        const user = await prisma.user.findUnique({
            where : {userName : userName}
        })

        if(user){
            return res.status(409).json({
                message : "this userName already exsist"
            })
        }

        const hashPass = await bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data : {
                userName : userName,
                password : hashPass,
                email : email,
            }
        })

        const {password : _ , ...userWithoutPass} = newUser 

        return res.status(201).json(userWithoutPass)

    }catch(e){
        return res.status(500).json({
            message : "error occured while generating new user"
        })
    }
}

export const signIn = async(req : Request , res : Response) =>{
    try{

        const data = userSchemaSignIn.safeParse(req.body);

        if(!data.success){
            return res.status(400).json(data.error.issues);
        }

        const {userName , password} = data.data

        const user = await prisma.user.findUnique({
            where : {
                userName : userName
            }
        })

        if(!user){
            return res.status(404).json({
                message : "couldnt find the user please enter the correct username"
            })
        }

        const hashPass = user.password
        const isCorrect = await bcrypt.compare(password, hashPass);

        if(!isCorrect){
            return res.status(401).json({
                message : "please enter the correct Password"
            })
        }
        
        const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET!);
        const {password : _ , ...obj} = user
        // i have to change this during deploy
        return res.status(200).cookie('access_token', token, {
             httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            // httpOnly: true,
            // secure: false,
            // sameSite: "none",
        }).json(obj)
        

    }catch(e){
        return res.status(500).json({
            message : "error logging in user"
        })
    }
}

export const logout = async(req : Request , res : Response) =>{
    try{
        res.clearCookie("access_token" ,{
             httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        return res.status(200).json({
            message : "user logged out successfully"
        })
    }catch(e){
        return res.status(500).json({
            message : "error logging out user"
        })
    }
}


export const isLoggedIn = async(req : Request , res : Response) =>{
    try{
        res.status(200).json({
            message : "user is logged in"
        })
    }catch(e){
        return res.status(500).json({
            message : "error checking if user is logged in"
        })
    }
}