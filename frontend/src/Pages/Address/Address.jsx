import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Address.css";
import { Link, useNavigate } from "react-router-dom";

const Address = () => {
  const { addresses, deleteAddress } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="address-page">
      <h2 className="address-title">Saved Addresses</h2>
      <Link to={"/add-address"}>
        <button className="address-add-btn">Add Address</button>
      </Link>
      
      <ul className="address-list">
        {addresses.map((addr) => (
          <li key={addr._id} className="address-item">
            <p className="address-name">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="address-details">
              {addr.houseNo}, {addr.city}, {addr.state} - {addr.pin}
            </p>
            <p className="address-phone">Phone: {addr.phone}</p>
            {addr.isDefault && <span className="address-default-badge">Default</span>}

            {/* Update Button */}
           <Link to={`/update-address/${addr._id}`}> <button
              className="address-update-btn"
              onClick={() => navigate(`/update-address/${addr._id}`)}
            >
              Edit
            </button></Link>

            {/* Delete Button */}
            <button
              className="address-delete-btn"
              onClick={() => deleteAddress(addr._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Address;
