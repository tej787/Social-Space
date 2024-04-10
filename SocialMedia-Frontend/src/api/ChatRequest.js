import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });

 export const userChats = () => API.get(`/api/chat/myChat`);
 export const createChat = (data) => API.post('/api/chat/', data);
 export const deleteChat = (id) => API.delete(`/api/chat/${id}`);
