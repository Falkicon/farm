export const API_CONFIG = {
    BASE_URL: import.meta.env.PROD
        ? '/api'
        : 'http://localhost:8000/api',
    TIMEOUT: 5000
}; 