import axios from 'axios'


const API = axios.create({ baseURL: 'https://social-space-backend-ekln.onrender.com',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });

  export const getTimelinePosts= ()=> API.get(`/api/post/timeline`);
 
 

 export const likePost=(id)=>API.get(`/api/post/${id}/like`)
 export const getUserPosts= (id)=> API.get(`/api/post/${id}/posts`);
