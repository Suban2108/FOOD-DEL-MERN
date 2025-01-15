import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

  const DELIVERY_FEE = 2; // Define delivery fee constant

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target; // Destructure `name` and `value`
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item }; // Avoid direct mutation
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      userId: token,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : DELIVERY_FEE)
    };


    // Ensure `amount` is greater than 0 and `address` is complete
    if (orderData.amount <= 0) {
      alert("Invalid total amount.");
      return;
    }

    if (!data.firstName || !data.lastName || !data.street || !data.city || !data.zipcode) {
      alert("Please complete your address.");
      return;
    }



    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.log("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }
  }, [token])

  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
          placeholder="Email Id"
        />
        <input
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            required
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            required
            placeholder="Zip code"
          />
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
          placeholder="Phone number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals (₹)</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : DELIVERY_FEE}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : DELIVERY_FEE)}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
