import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = "https://food-del-backend-0gd3.onrender.com";

    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
          const response = await axios.get(`${url}/api/food/list`);
          setFoodList(response.data.data); // Assuming `data.data` contains the food list
        } catch (error) {
          console.error("Failed to fetch food list:", error); // Log any errors
        }
      };
      
      // Check localStorage for token on component mount
      useEffect(() => {
        async function loadData() {
          try {
            await fetchFoodList(); // Fetch food list
      
            const storedToken = localStorage.getItem("token"); // Get token from localStorage
            if (storedToken) {
              setToken(storedToken); // Update token state if it exists
              await loadCartData(storedToken);
            }
          } catch (error) {
            console.error("Error during initial data load:", error); // Catch errors during initialization
          }
        }
        loadData(); // Invoke the async function
      }, [url]); // Add `url` to the dependency array if it can change
      

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
          await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev => ({ ...prev, [itemId]: prev[itemId] - 1 })));
        if (token) {
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const removeFromCartComplete = (itemId) => {
        setCartItem((prev => ({ ...prev, [itemId]: 0 })));
    }

    const loadCartData = async (token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}});
        setCartItem(response.data.cartData);
    }



    const contextValue = {
        food_list,
        cartItem, setCartItem,
        addToCart,
        removeFromCart,
        removeFromCartComplete,
        getTotalCartAmount,
        url,
        token, setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
