import React, { useState, useContext } from "react";
import './AddAddress.css';
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
// import "./Address.css";

const AddAddress = () => {
  const { addAddress } = useContext(StoreContext); // Get addAddress from Context
  const navigate = useNavigate(); // React Router navigation

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    houseNo: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all required fields are filled
    if (
      !newAddress.firstName ||
      !newAddress.lastName ||
      !newAddress.houseNo ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pin ||
      !newAddress.phone
    ) {
      alert("Please fill in all fields.");
      return;
    }

    addAddress(newAddress); // Add the address using Context function

    // Reset the form
    setNewAddress({
      firstName: "",
      lastName: "",
      houseNo: "",
      city: "",
      state: "",
      pin: "",
      phone: "",
      isDefault: false,
    });

    navigate("/address"); // Redirect back to the address list after submission
  };

  return (
    <div className="add-address-container">
      <h2 className="add-address-title">Add New Address</h2>
      <form onSubmit={handleSubmit} className="add-address-form">
        <input type="text" name="firstName" value={newAddress.firstName} onChange={handleChange} placeholder="First Name" required className="add-address-input" />
        <input type="text" name="lastName" value={newAddress.lastName} onChange={handleChange} placeholder="Last Name" required className="add-address-input" />
        <input type="text" name="houseNo" value={newAddress.houseNo} onChange={handleChange} placeholder="House No" required className="add-address-input" />
        <input type="text" name="city" value={newAddress.city} onChange={handleChange} placeholder="City" required className="add-address-input" />
        <input type="text" name="state" value={newAddress.state} onChange={handleChange} placeholder="State" required className="add-address-input" />
        <input type="number" name="pin" value={newAddress.pin} onChange={handleChange} placeholder="PIN Code" required className="add-address-input" />
        <input type="number" name="phone" value={newAddress.phone} onChange={handleChange} placeholder="Phone Number" required className="add-address-input" />
        <label className="add-address-checkbox-label">
          <input type="checkbox" name="isDefault" checked={newAddress.isDefault} onChange={handleChange} /> Set as Default
        </label>
        <button type="submit" className="add-address-btn">Add Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
