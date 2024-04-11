import axios from 'axios'


const API = axios.create({ baseURL: 'https://social-space-backend-ekln.onrender.com',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });


export const logIn= (formData)=> API.post('/api/auth/login',formData);
export const signUp = (formData) => API.post('/api/auth/signup', formData);
export const logOut = () => API.get('/api/auth/logout');

export const forgotPassword = ( formData) =>  API.post(`/api/auth/forgotPassword`, formData);
export const resetPassword = ( token,formData) =>  API.patch(`/api/auth/resetPassword/${token}`, formData);




