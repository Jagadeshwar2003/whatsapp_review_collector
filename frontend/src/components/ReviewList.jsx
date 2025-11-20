// src/components/ReviewList.jsx
import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/api';
import { formatDate } from '../utils/formatters';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        // Attempt to fetch data from your FastAPI backend
        const data = await getReviews(); 
        setReviews(data);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviewsData();
  }, []); // Runs only once on mount

  // --- Render Status Checks ---
  if (isLoading) {
    return <div style={{padding: '20px', textAlign: 'center'}}>Loading product reviews...</div>;
  }

  if (error) {
    return <div style={{padding: '20px', textAlign: 'center', color: 'red'}}>Error: {error} (Is your backend running on port 8000?)</div>;
  }

  if (reviews.length === 0) {
    return <div style={{padding: '20px', textAlign: 'center'}}>No reviews have been submitted yet.</div>;
  }

  // Minimal styling for the table
  const tableStyle = { width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
  const tableRowHeaderStyle = { backgroundColor: '#DCF8C6', color: '#075E54' };
  const tableHeaderCellStyle = { padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' };
  const tableBodyCellStyle = { padding: '12px', borderBottom: '1px solid #ddd' };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr style={tableRowHeaderStyle}>
            <th style={tableHeaderCellStyle}>User Name</th>
            <th style={tableHeaderCellStyle}>Product Name</th>
            <th style={tableHeaderCellStyle}>Review</th>
            <th style={tableHeaderCellStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} style={{borderBottom: '1px solid #eee'}}>
              <td style={tableBodyCellStyle}>{review.user_name}</td>
              <td style={tableBodyCellStyle}><strong>{review.product_name}</strong></td>
              <td style={tableBodyCellStyle}>{review.product_review}</td>
              <td style={tableBodyCellStyle}>{formatDate(review.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewList;