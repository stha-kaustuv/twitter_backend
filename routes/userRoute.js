import express from "express";
import {Register, Logout,} from "../controllers/userController.js"
import { Login } from "../controllers/userController.js";


const router = express.Router();

router.post("/api/register",Register);
router.post("/api/login",Login);
router.get("/api/logout",Logout);


export default router; 