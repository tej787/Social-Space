import React, { useEffect, useState } from 'react'
import Logo from "../../img/logo.png";
import { message } from 'antd'
import ForgotPassWord from "../../img/mobile-password.png"

import { useDispatch, useSelector } from 'react-redux'

import './ForgotPassword.css'
import { forgotPassword } from '../../actions/AuthAction';


function ForgotPassword() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(null);
    useEffect(() => {
        document.title = 'Social Space || Forgot Password';
      }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData || !formData.email) {
            message.error("Enter Email Id");
            return;
        }
        let data = formData;
       
        dispatch(forgotPassword(data))
        ;
    };
    return (
        <div className="Auth">
            <div className="a-left" style={{cursor:'pointer'}} onClick={() => { window.location.href = '/auth' }}>
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Social Scape</h1>
                    <h6>Welcome to Social Scape, where every idea fits right in!</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm">
                <img style={{ height: '140px', width: '140px' }} src={ForgotPassWord} alt="Reset Icon" />

                    <h3 style={{ textAlign: 'center', marginBottom: '0px' }}>Forgot Password or Need to Activate Account?<br /> No Worries!</h3>
                    <h5 style={{ textAlign: 'center', marginTop: '0px' }}>Enter your email address below and we'll send you instructions.</h5>

                    <div>
                        <input
                            type="email"
                            className="infoInput"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}

                        />
                    </div>

                    <div>

                        <button className="button infoButton" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
export default ForgotPassword