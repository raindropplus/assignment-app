import express from "express";
import { loginHandler, signupHandler } from "../controllers/authController";
const authRouter = express.Router();

authRouter.post('/login', loginHandler);
authRouter.post('/signup', signupHandler);

export default authRouter;