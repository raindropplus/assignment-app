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
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await getUserByEmail(email);

        if (user) {

            if (user && (await bcrypt.compare(password, user.password))) {
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

            }
            res.status(404).json({
                status: 404,
                message: "Invalid Password",
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Invalid User",
            });
        }

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
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error, req, res);
    }
};
