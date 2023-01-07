import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { saveUser, getAllUsers, update, deleteById, getUserById, getUserByEmail } from "../services/userService";
// import validators from "../models/view-models";
// import { handleValidation } from "../middlewares";
import { NotFound } from '../utils/errors';

const router = express.Router();

const loginHandler = async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await getUserByEmail(email);
        console.log( user.password);
        console.log(password);
     
      
        if (user) {

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    }
                );
                
                // save user token
                user.token = token;

                // user
                res.status(200).send(user);

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

const getHandler = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        return next(error, req, res);
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (user) {
            res.status(200).send(user);
        }
        else {
            throw new NotFound('User not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await saveUser(body);
        res.status(201).send(user._id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await update(body);
        res.status(200).send(user._id);
    } catch (error) {
        return next(error, req, res);
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
}
router.post('/login', loginHandler);
router.get('/', getHandler);
router.get('/:id', getByIdHandler);
//router.post('/', handleValidation(validators.userSchemaValidate), postHandler);
router.post('/', postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);

const configure = (app) => {
    app.use('/api/v1/users', router);
}

export default configure;