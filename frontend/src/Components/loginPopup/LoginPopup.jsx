import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import {toast} from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const {url,token,setToken}  = useContext(StoreContext);

    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async(e)=>{
       e.preventDefault();
       let newUrl = url;

       if (currState === "Login") {
            newUrl += "/api/user/login";
       }
       else{
        newUrl += "/api/user/register";
       }

       const response = await axios.post(newUrl,data);

       if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            toast.success("Registration Successfull");
            setShowLogin(false);
       }
       else{
         toast.error(response.data.message);
       }
    }

    return (
        <div className='login-popup'>
            <form action="" onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" onChange={onChangeHandler} value={data.password} name='password' placeholder='password' required />

                </div>
                <button type='submit'>{currState === "Sign up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By contunuing, I agree to th terms of use & provacy policy.</p>
                </div>
                {currState==="Login"
                ? <p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
                : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
