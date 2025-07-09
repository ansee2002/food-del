import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./ReviewedFoods.css";

const ReviewedFoods = () => {
    const [reviewedFoods, setReviewedFoods] = useState([]);
    const [ error,setError] = useState("");

        const fetchReviewedFoods = async () => {
        try {
           const {data} = await axios.get("http://localhost:4000/api/food/reviewed");
           console.log("Reviewed foods response",data);
           setReviewedFoods(data.data); 
        } catch (error) {
            console.error("Error fetching reviewed foods:",error);
            setError("Failed to load reviewed products. Please try again later."); // ✅ Handle API failure
        }
    };
    useEffect(()=>{
      fetchReviewedFoods();
    },[]);

    return (
        <div className='reviewed-foods-container'>
            <h2>Reviewed Products</h2>
            {error ? (
                <p className="error-message">{error}</p> // ✅ Display error message if API fails
            ) : (reviewedFoods?.length > 0 ? (
                <div className="reviewed-foods-grid">
                    {reviewedFoods.map((food) => (
                        <div key={food._id} className='reviewed-food-card'>
                            <h3>{food.name}</h3>
                            <img src={`http://localhost:4000/images/${food.image}`} alt={food.name} width="100" />
                            <p>{food.description}</p>
                            <p>Price: ${food.price}</p>
                            <p>Category: {food.category}</p>
                            <p>Rating</p>
                            
                            {food.reviews.length > 0 ? (
                                <ul>
                                {food.reviews.map((review, index) => (
                                    <li key={index}>
                                    {review.comment} ({review.rating}⭐)
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p>No reviews yet</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-products-message">No reviewed products yet. Be the first to leave a review!</p> // ✅ Better empty state message
            ))}
        </div>
    );
};

export default ReviewedFoods;