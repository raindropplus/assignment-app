import { saveUserContent, getAllUserContents, updateUserContent, deleteById, getUserContentById,getUserContentByUserId } from "../services/userContentService";
import { NotFound } from '../utils/errors';

export const getHandler = async (req, res, next) => {
    try {
        const users = await getAllUserContents();
        res.status(200).send(users);
    } catch (error) {
        return next(error, req, res);
    }
};

export const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserContentById(id);
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

export const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await saveUserContent(body);
        res.status(200).send(user._id);
    } catch (error) {
        return next(error, req, res);
    }
};

export const putHandler = async (req, res, next) => {
    try {
        const body = req.body;        
        const user = await updateUserContent(body);
        res.status(200).send(user._id);
    } catch (error) {
        return next(error, req, res);
    }
}

export const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
};

export const getByUserIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserContentByUserId(id);
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
