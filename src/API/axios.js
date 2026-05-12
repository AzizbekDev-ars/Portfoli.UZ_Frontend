import axios from 'axios';

// Odatiy so'rovlar uchun mijoz (Client) API nusxasi
const apiClient = axios.create({
  // baseURL ni ehtiyojingizga qarab qo'shishingiz mumkin, masalan: 
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
});

// apiClient so'rovni yuborishdan oldin token bormi tekshiradi
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // tokenni qo'shish
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Admin huquqlari uchun API nusxasi
const apiAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
});

// apiAdmin so'rovni yuborishdan oldin admin_token bormi tekshiradi
apiAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // tokenni qo'shish
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



// Ikkalasini birgalikda default export qilish
export default { apiClient, apiAdmin };
