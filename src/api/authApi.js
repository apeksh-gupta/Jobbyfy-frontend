import api from "./axiosInstance.js";



export const loginApi = async (data) => {
  try {
    const res = await api.post('/auth/login' , data);
    return res.data;
  } catch (error) {
    return error.response?.data || {message: "Login Error"};

  }
}

export const signupApi = async (data) => {
  try {
    const res = await api.post('/auth/signup' , data);
    return res.data;
  } catch (error) {
    return error.response?.data || {message: "Signup Error"};
  }
};

