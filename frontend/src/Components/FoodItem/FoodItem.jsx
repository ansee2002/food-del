import React, { useContext, } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext} from '../../Context/StoreContext';
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* wrap image with link to navigate to FoodDetails page */}
        <Link to={`/food/${id}`} className='food-item-link'>
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
        </Link>
        {!cartItems[id]
          ?<img className="add"onClick={() => addToCart(id)}src={assets.add_icon_white} alt="Add"/>
          :<div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red}  alt="Remove"/>
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)}src={assets.add_icon_green}alt="Add" />
          </div>
}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
