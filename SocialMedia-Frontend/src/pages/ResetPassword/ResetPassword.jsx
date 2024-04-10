import React, { useEffect, useState } from 'react'
import Logo from "../../img/logo.png";
import Reset from "../../img/reset.png"
import { message } from 'antd'
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from '../../actions/AuthAction';



import './ResetPassword.css'

function ResetPassword() {
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        document.title = 'Social Space || Reset Password';
      }, []);
    
  const [formData, setFormData] = useState(null);

  const loading = useSelector((state)=>state.authReducer.loading)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let data = formData;
        let token= params.token;
        if(!data.password)message.error('Enter New Password');
        if(!data.passwordConfirm)message.error('Enter Password Confirm');

        dispatch(resetPassword(token,data));
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
                <img style={{ height: '140px', width: '140px' }} src={Reset} alt="Reset Icon" />

                    <h3>Reset Your Password Here</h3>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required

                        />

                    </div>
                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required

                        />


                    </div>

                    <div>
                        <button className="button infoButton" onClick={handleSubmit} disabled={loading}>
                            {loading? "Reseting...": "Reset"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default ResetPassword