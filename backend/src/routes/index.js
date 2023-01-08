import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const configure = (app) => {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
}

export default configure;