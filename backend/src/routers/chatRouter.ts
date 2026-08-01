import { Router } from "express";
import { deleteChats, getChats  } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";



const router = Router();


router.get("/:roomId" , verifyToken , getChats);
router.delete("/:roomId" , verifyToken, deleteChats);

    

export default router