import React, { useState, useEffect, useContext } from "react";
import './UpdateAddress.css';
import { StoreContext } from "../../Context/StoreContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Address.css";

const UpdateAddress = () => {
  const { updateAddress, token } = useContext(StoreContext);
  const { addressId } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:4000"; // ✅ Make sure this is correct


  const [updatedAddress, setUpdatedAddress] = useState({
    firstName: "",
    lastName: "",
    houseNo: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    // Fetch the specific address using the ID
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${url}/api/address/${addressId}`, {
          headers: { token },
        });
        


        // Pre-fill the form with the fetched address
        setUpdatedAddress(response.data);

      } catch (error) {
        console.error("Error fetching address:", error);
        alert("Failed to load address details.");
      }
    };

    if (token) {
      fetchAddress();
    }
  }, [addressId, token]); // ✅ Depend on id and token

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !updatedAddress.firstName ||
      !updatedAddress.lastName ||
      !updatedAddress.houseNo ||
      !updatedAddress.city ||
      !updatedAddress.state ||
      !updatedAddress.pin ||
      !updatedAddress.phone
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
   
      await updateAddress(addressId, updatedAddress,token);
      navigate("/address");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

  return (
    <div className="address-form-container">
      <h2 className="address-title">Update Address</h2>
      <form onSubmit={handleSubmit} className="address-form">
        <input type="text" name="firstName" value={updatedAddress.firstName} onChange={handleChange} placeholder="First Name" required className="address-input" />
        <input type="text" name="lastName" value={updatedAddress.lastName} onChange={handleChange} placeholder="Last Name" required className="address-input" />
        <input type="number" name="houseNo" value={updatedAddress.houseNo} onChange={handleChange} placeholder="House No" required className="address-input" />
        <input type="text" name="city" value={updatedAddress.city} onChange={handleChange} placeholder="City" required className="address-input" />
        <input type="text" name="state" value={updatedAddress.state} onChange={handleChange} placeholder="State" required className="address-input" />
        <input type="number" name="pin" value={updatedAddress.pin} onChange={handleChange} placeholder="PIN Code" required className="address-input" />
        <input type="number" name="phone" value={updatedAddress.phone} onChange={handleChange} placeholder="Phone Number" required className="address-input" />
        <label className="address-checkbox-label">
          <input type="checkbox" name="isDefault" checked={updatedAddress.isDefault} onChange={handleChange} /> Set as Default
        </label>
        <button type="submit" className="address-update-btn">Update Address</button>
      </form>
    </div>
  );
};

export default UpdateAddress;

