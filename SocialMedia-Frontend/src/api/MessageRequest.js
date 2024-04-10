import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000',
withCredentials: true, // Include cookies with cross-site requests (if needed)
  headers: {
    'Content-Type': 'application/json', // Default content type for sending data
  },
 });

export const getMessages = (id) => API.get(`/api/message/${id}`);
export const addMessage = (data) => API.post('/api/message/', data);