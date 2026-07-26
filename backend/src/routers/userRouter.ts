import { Router } from "express";
import {signup} from "../controllers/userController.js"



const router = Router();


router.get("/signup" , signup);



export default router