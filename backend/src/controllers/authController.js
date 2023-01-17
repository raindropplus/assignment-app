import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { saveUser, getUserByEmail } from "../services/userService";


export const createToken = id => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};

export const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // 1) check if email and password exist
        if (!email || !password) {
          return next(
            new AppError(404, "fail", "Please provide email or password"),
            req,
            res,
            next,
          );
        }
    
        // 2) check if user exist and password is correct
        const user = await getUserByEmail(email);
    
        if (!user || !(await user.correctPassword(password, user.password))) {
          return next(
            new AppError(401, "fail", "Email or Password is wrong"),
            req,
            res,
            next,
          );
        }
    
        // 3) All correct, send jwt to client
        const token = createToken(user.id);
    
        // Remove the password from the output
        user.password = undefined;
    
        res.status(200).json({
          status: "success",
          token,
          data: {
            user,
          },
        });
      } catch (error) {
             
        return next(error, req, res);
    }
};

export const signupHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await saveUser(body);
        const token = createToken(user.id);       

        res.status(201).json({
            status: "success",
            message: "Your account has been created",
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error, req, res);
    }
};
