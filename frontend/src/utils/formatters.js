// src/utils/formatters.js

/**
 * Formats a given ISO timestamp string (e.g., "2025-11-17T12:34:56Z") 
 * into a human-readable date and time string.
 */
export const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};