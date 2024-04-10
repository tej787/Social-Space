import axios from 'axios'


const API = axios.create({ baseURL: 'https://socialmedia-ci6v.onrender.com',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });

 export const uploadImage = (data)=> API.post('/api/uploadPostImage', data);
 export const uploadPost = (data) => API.post("/api/post", data);
 
 export const uploadUserImage = (data)=> API.post('/api/uploadUserImage', data);

