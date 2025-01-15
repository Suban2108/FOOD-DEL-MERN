import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const cart = () => {
  const { cartItem, food_list, removeFromCart, addToCart, removeFromCartComplete, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr style={{ backgroundColor: 'black', border: "none" }} />
        {
          food_list.map((item) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-item-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <div className="cart-item-counter">
                      <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                      <p>{cartItem[item._id]}</p>
                      <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                    </div>
                    <p>₹{cartItem[item._id] * item.price}</p>
                    <p className="cross" onClick={() => removeFromCartComplete(item._id)}>X</p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals(₹)</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cart
