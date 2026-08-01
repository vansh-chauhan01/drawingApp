import { Router } from "express";
import {signIn, signup , logout, isLoggedIn} from "../controllers/userController.js"
import { verifyToken } from "../middlewares/verifyToken.js";



const router = Router();


router.post("/signup" , signup);
router.post("/signin" , signIn);
router.post("/logout" , verifyToken , logout );
router.get("/isloggedin" , verifyToken , isLoggedIn);



export default router