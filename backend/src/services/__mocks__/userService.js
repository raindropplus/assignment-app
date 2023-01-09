import models from "../../models";

let users = [{
    id: '1', name: 'test001', email:'test@gmail.com', password: '123456', image:'123'
},];

export const getAllUsers = async () => {
    return users;
}

export const saveUser = async (user) => {
    const model = new models.User(user);
    users.push(model);
    return model;
};

export const getUserById = async (id) => {
    let model = users.find(x => x.id === id);
    return model;
}

export const update = async (user) => {
    users[0].email = user.email;
    return users[0];
}


export const deleteById = async (id) => {
    users = [];
}

export const getUserByEmail = async (email) => {
    let model = users.find(x => x.email === email);
    return model;
}
