import Address from "../models/addressModel.js";

// Add new address
export const addAddress = async (req, res) => {
  try {
    const { userId, firstName, lastName, houseNo, city, state, pin, phone, isDefault } = req.body;

    // If isDefault is true, update all other addresses to false
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const newAddress = new Address({
      userId,
      firstName,
      lastName,
      houseNo,
      city,
      state,
      pin,
      phone,
      isDefault,
    });

    await newAddress.save();
    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all addresses of a user
export const getAddresses = async (req, res) => {
    try {
      const addresses = await Address.find({ userId: req.body.userId }); 
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching addresses" });
    }
  };
  
// Update address

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    // console.log(addressId)
    const { isDefault, userId } = req.body; // ✅ Ensure userId is received
// console.log(userId);

    // Ensure the address exists before updating
    const existingAddress = await Address.findById(addressId);
    // console.log(existingAddress);
    
    if (!existingAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If setting this address as default, update all other addresses for the user
    if (isDefault) {
      await Address.updateMany(
        { userId }, // ✅ Use userId from request body
        { $set: { isDefault: false } }
      );
    }

    // Update the specific address
    const updatedAddress = await Address.findByIdAndUpdate(addressId, req.body, { new: true });
// console.log(updatedAddress);

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params; // Extract address ID from request parameters

    // Find the address by ID
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};