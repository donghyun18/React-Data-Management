// Central place for the backend URL. Locally this falls back to
// http://localhost:5001. In production, set REACT_APP_API_URL in your
// hosting provider's environment variables (e.g. Vercel) to your deployed
// backend's URL (e.g. https://your-app.onrender.com).
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
