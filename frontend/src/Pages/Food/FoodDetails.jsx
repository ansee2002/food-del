import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './FoodDetails.css';
import axios from "axios";

const FoodDetails = () => {
    const {id} = useParams(); // get food id from url
    const {food_list,url} = useContext(StoreContext);

    //find the clicked food item by id
    const food = food_list.find(item => item._id === id);

    //state for reviews
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [ rating, setRating] = useState(5);


    // fetch reviews when component mounts
    useEffect(()=>{
      fetch(`${url}/api/food/${id}/reviews`)
      .then(res => res.json())
      .then(data => {
        console.log("API Response",data);
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }else{
          console.log("Reviews is missing or not an array",data.reviews);
          
          setReviews([]);
        }
      })
      .catch(err => console.error("Error fetching reviews",err));
    },[id, url]);

// 88888
    const fetchReviewedFoods = async () => {
      try {
        const response = await axios.get(`${url}/api/food/reviewed`);
        console.log("Reviewed foods response",response.data);
      } catch (error) {
        console.error("Error fetching reviewed foods",error);
      }
    };


    // function to handle review submission
    const submitReview = async () => {


      const dataObj = {comment:newReview,rating};

      const address=`${url}/api/food/${id}/review`;
      const token = localStorage.getItem("token");
      const response = await axios.post(address, dataObj,{
        headers:{token},
      })

      console.log(response.data)
      // const data = await response.json();
      if (response.data.success) {
        setReviews([...reviews,response.data.review]);
        setNewReview("");//clear input 
        setRating(5);

        fetchReviewedFoods();// refresh reviewed foods
      }
    };
    if (!food) {
     return <h2>Food item not found</h2>   
    }

  return (
    <div className='food-details'>
        <img src={`${url}/images/${food.image}`} alt={food.name} className='food-details-image'/>

        <div className="food-details-info">
            <h2>{food.name}</h2>
            <p className='food-details-price'>${food.price}</p>
            <p className='food-details-description'>{food.description}</p>
        </div>

        {/* review section */}
        <div className="reviews">
          <h3>Customer Reviews</h3>
          {/* Add review */}
          {reviews?.length > 0 ? (
        reviews.map((review, index) => (
          review ? (
      <div key={index}>
      {/* <p>{review.user || "Anonymous"}</p> */}
      <p>{review.rating ? `${review.rating} Stars` : "No rating"}</p>
      <p>{review.comment || "No review available."}</p>
    </div>
  ) : null
))
) : (
  <p>No reviews available.</p>
)}

          <div className="add-review">
            <h4>Leave a Review</h4>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[1,2,3,4,5].map(num=> (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <textarea
            value={newReview}
            onChange={(e)=> setNewReview(e.target.value)}
            placeholder='Write your review...'
            />
            <button onClick={submitReview}>Submit Review</button>
          </div>
        </div>
    </div>
  );
};

export default FoodDetails;