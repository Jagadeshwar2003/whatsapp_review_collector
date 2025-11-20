// src/services/api.js

/**
 * Fetches all product reviews from the backend API (GET /api/reviews).
 * Assumes a proxy is set up in package.json to forward requests to the backend server.
 */
export const getReviews = async () => {
    // This targets your backend's GET /api/reviews endpoint 
    // The 'proxy' in package.json redirects this call to http://localhost:8000
    const response = await fetch('/api/reviews'); 

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - Could not fetch reviews.`);
    }

    return response.json(); 
};