import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('menu');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();


  const Logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(''); // Reset the state
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu('home')}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
            home
          </li>
        </Link>
        <a href="#explore-menu">
          <li onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
            menu
          </li>
        </a>
        <a href="#app-download">
          <li
            onClick={() => setMenu('mobile-app')}
            className={menu === 'mobile-app' ? 'active' : ''}
          >
            mobile-app
          </li>
        </a>
        <a href="#footer">
          <li
            onClick={() => setMenu('contact us')}
            className={menu === 'contact us' ? 'active' : ''}
          >
            contact us
          </li>
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <li
              style={{ listStyle: 'none' }}
              onClick={() => setMenu('cart')}
              className={menu === 'cart' ? 'active' : ''}
            >
              <img src={assets.basket_icon} alt="Basket Icon" />
            </li>
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign up</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Bag Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => Logout()}>
                {/* Explicitly call the Logout function */}
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
