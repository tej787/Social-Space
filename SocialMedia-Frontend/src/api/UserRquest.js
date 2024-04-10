import axios from 'axios'


const API = axios.create({ baseURL: 'https://social-space-backend-nl0z.onrender.com',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });

export const getme= ()=> API.get('/api/user/me');
export const getUser = (userId) => API.get(`/api/user/${userId}`);

export const updateUser = ( formData) =>  API.patch(`/api/user/updateMe`, formData);
export const updateUserPassword = ( formData) =>  API.patch(`/api/user/updateMyPassword`, formData);

export const getAllUser = () =>  API.get(`/api/user/`);

export const followUser = (id)=> API.get(`/api/user/${id}/follow`)
export const unfollowUser = (id)=> API.get(`/api/user/${id}/unfollow`)

export const deactivateAccount = ()=> API.delete(`/api/user/deactivateMe`)



