import express from "express";
import { verifyToken } from "../middlewares";
import { getHandler, getByIdHandler, getByUserIdHandler, postHandler, putHandler, deleteHandler } from "../controllers/userContentController";
const userContentRouter = express.Router();

// userRouter.post('/login', loginHandler);
// userRouter.post('/signup', loginHandler);
userContentRouter.get('/', getHandler);
userContentRouter.get('/:id', getByIdHandler);
userContentRouter.get('/user/:id', getByUserIdHandler);
userContentRouter.post('/', verifyToken, postHandler);
userContentRouter.put('/', verifyToken, putHandler);
userContentRouter.delete('/:id', verifyToken, deleteHandler);

export default userContentRouter;