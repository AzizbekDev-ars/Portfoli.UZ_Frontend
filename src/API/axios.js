import axios from 'axios';

// Odatiy so'rovlar uchun mijoz (Client) API nusxasi
const apiClient = axios.create({
  // baseURL ni ehtiyojingizga qarab qo'shishingiz mumkin, masalan: 
  baseURL: 'http://localhost:5000'
});

// apiClient so'rovni yuborishdan oldin tokenClient bormi tekshiradi
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokenClient');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // tokenni qo'shish
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Admin huquqlari uchun API nusxasi
const apiAdmin = axios.create({
  baseURL: 'http://localhost:5000/admin'
});

// apiAdmin so'rovni yuborishdan oldin tokenAdmin bormi tekshiradi
apiAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokenAdmin');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // tokenni qo'shish
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



// Ikkalasini birgalikda default export qilish
export default { apiClient, apiAdmin };
