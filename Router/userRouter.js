import express from "express";
import { loginController } from "../Controller/LoginController/loginController.js";
import { registerController } from "../Controller/RegisterController/registerController.js";
import { isLoggedinController } from "../Controller/isLoggedinController/isLoggedinController.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/isLoggedin", isLoggedinController);

export default router;