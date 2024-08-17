// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the baseURL to match your backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
