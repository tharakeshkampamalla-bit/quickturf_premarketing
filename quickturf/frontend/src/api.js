import axios from 'axios'

// In development, Vite proxy handles /api → localhost:5000
// In production, VITE_API_URL must point to your deployed backend (e.g. https://quickturf-api.onrender.com)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

export default api
