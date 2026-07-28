import Router from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { makeRoom , getRoom } from "../controllers/roomController.js";


const router = Router();


router.post("/" , verifyToken , makeRoom);
router.get("/:name" , getRoom);


export default router