import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRecommendations = (productId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Get personalized recommendations
        const { data } = await axios.get(`http://localhost:5000/api/recommendations`, {
          params: { 
            productId,
            limit: 4
          }
        });
        
        setRecommendations(data.recommendations || []);
        setRecentlyViewed(data.recentlyViewed || []);
        setSimilarProducts(data.similarProducts || []);

      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    fetchRecommendations();
  }, [productId]);

  return {
    recommendations,
    recentlyViewed,
    similarProducts
  };
};
