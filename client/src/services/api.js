export const apiUrl = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';