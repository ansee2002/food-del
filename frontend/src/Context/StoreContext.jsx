import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
// axios.defaults.withCredentials=true
  const [cartItems, setCartItems] = useState({});
  const [food_list,setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [addresses, setAddresses] = useState([]);
  const url = "http://localhost:4000";


const addToCart =  async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
       await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    console.log(response.data.data)
    setFoodList(response.data.data)
 }

 const loadCartData = async (token) => {
  const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
  setCartItems(response.data.cartData);
 }
  // Address functions

  const fetchAddresses = async (token) => {
    // console.log(token)
    try {
      // console.log(token);
        if (!token) {
            console.error("Token is missing! User not authenticated.");
            return;
        }

        const res = await fetch(url + "/api/address/list", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                token: token  // ✅ Send token correctly like `addToCart`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setAddresses(data);
        
        // console.log("Fetched addresses:", data);
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
};

const addAddress = async (newAddress) => {
  try {
      await axios.post(url + "/api/address/add", newAddress, {
          headers: { token: token },  // ✅ Same format as `addToCart`
      });
      fetchAddresses(token);
  } catch (error) {
      console.error("Error adding address:", error);
  }
};
const updateAddress = async (id, updatedData,tok) => {
  try {
    // console.log(tok);
 //console.log(`${url}/api/address/update/${id}`);
     const ans =  await axios.patch(`${url}/api/address/update/${id}`, updatedData, {
          headers: { token:tok },  // ✅ Token is correctly passed
      });

   

      fetchAddresses(tok);  // ✅ Fetch updated addresses without passing token
  } catch (error) {
      console.error("Error updating address:", error);
  }
};


const deleteAddress = async (id) => {
  try {
      await axios.delete(url + `/api/address/delete/${id}`, {
          headers: { token: token },  // ✅ Same structure as `addToCart`
      });
      fetchAddresses(token);
  } catch (error) {
      console.error("Error deleting address:", error);
  }
};

  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
     
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      const tok = localStorage.getItem("token")
      // console.log(tok)
      await loadCartData(localStorage.getItem("token"));
      await fetchAddresses(tok);
      }
   }
   loadData();
  },[]);


  const contextValue = {

    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    addresses,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider