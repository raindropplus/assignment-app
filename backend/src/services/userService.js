import models from "../models";
import { NotFound } from "../utils/errors";

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
}

export const saveUser = async (user) => {
    const model = new models.User(user);   
    const savedUser = await model.save();
    return savedUser;
};

export const update = async (user) => {
    const id = user._id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.name = user.name;
        model.image = user.image;
        model.updatedAt =  Date.now;
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

export const getUserById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    return model;
}

export const getUserByEmail = async (email) => {
    const User = models.User;
    let model = await User.findOne({email: email}).select("+password");
    return model;
}