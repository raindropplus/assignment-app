import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:7000/api/v1/";

const getUsers = () => {
  return axios.get(API_URL + "users");
};

const getUsersDetails = (id) => {
  return axios.get(API_URL + "users/"+id);
};

const getUsersContentDetails = (id) => {
  return axios.get(API_URL + "user-contents/user/"+id);
};

const createContent = (name, userId, url, image) => {
  return axios.post(API_URL + "user-contents", {
    name,
    userId,
    url,
    image
  },{ headers: authHeader() });
};

const updateContent = (_id, name, userId, url, image) => {
  return axios.put(API_URL + "user-contents", {
    _id,
    name,
    userId,
    url,
    image
  },{ headers: authHeader() });
};

const getContentById = (id) => {
  return axios.get(API_URL + "user-contents/"+id);
};

const updateUser = (user) => {
  return axios.put(API_URL + "users", user,{ headers: authHeader() });
};


const userService = {
  getUsers,
  getUsersDetails,
  getUsersContentDetails,
  createContent,
  getContentById,
  updateContent,
  updateUser

};

export default userService