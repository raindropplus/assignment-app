import models from "../models";
import { NotFound } from "../utils/errors";

export const getAllUserContents = async () => {
    const UserContent = models.UserContent;
    const userContents = await UserContent.find();
    return userContents;
}

export const saveUserContent = async (user) => {
    const model = new models.UserContent(user);
    const savedUserContent = await model.save();
    return savedUserContent;
};

export const updateUserContent = async (user) => {
    const id = user._id;
    const User = models.UserContent;
    let model = await UserContent.findById(id);
    if (model) {
        model.username = user.username;
        model.save();
        return model;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const deleteById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const getUserContentById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    return model;
}