import axios from "axios";

const API_URL = "http://localhost:7000/api/v1/auth/";

const register = (name, email, password, passwordConfirm) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
    passwordConfirm
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
