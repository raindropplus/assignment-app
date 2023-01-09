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

export const updateUserContent = async (userContent) => {
    const id = userContent._id;
    const uc = models.UserContent;
    let model = await uc.findById(id);
    if (model) {
        model.name = userContent.name;
        //model.image = userContent.image;
        model.url = userContent.url;
        model.userId = userContent.userId;        
        model.save();
        return model;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const deleteById = async (id) => {
    const User = models.UserContent;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const getUserContentById = async (id) => {
    const User = models.UserContent;
    let model = await User.findById(id);
    return model;
}

export const getUserContentByUserId = async (id) => {
    const User = models.UserContent;
    let model = await User.find({userId:id});
    return model;
}