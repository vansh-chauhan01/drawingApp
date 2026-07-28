import type { use } from "react";
import { email, z } from "zod";


export const userSchemaSignUp = z.object({
    userName : z.string(),
    password : z.string().min(8),
    email    : z.email()
})


export const userSchemaSignIn = z.object({
    userName : z.string(),
    password : z.string()
})


export const roomSchema = z.object({
    roomName : z.string().min(3).max(20)
})