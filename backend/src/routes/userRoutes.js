import express from "express";
import { verifyToken } from "../middlewares";
import { getHandler, getByIdHandler, postHandler, putHandler, deleteHandler } from "../controllers/userController";
const userRouter = express.Router();

// userRouter.post('/login', loginHandler);
// userRouter.post('/signup', loginHandler);
userRouter.get('/', getHandler);
userRouter.get('/:id', getByIdHandler);
userRouter.post('/', postHandler);
userRouter.put('/', verifyToken, putHandler);
userRouter.delete('/:id', verifyToken, deleteHandler);

export default userRouter;