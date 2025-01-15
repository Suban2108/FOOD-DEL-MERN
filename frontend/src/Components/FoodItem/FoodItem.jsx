import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
    
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={url+"/images/"+image} className='food-item-image' alt="" />
            {
                !cartItem?.[id]
                ?<img onClick={()=>addToCart(id)} src={assets.add_icon_white} className="add" alt=""/> :
                <div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItem[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img className="food-item-name-rating" src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItem
