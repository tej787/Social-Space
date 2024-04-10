import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { message } from 'antd'
import { updateUserPassword } from '../../actions/UserAction';



function PasswordUpdateCard() {
    const dispatch = useDispatch();
    
  const [formData, setFormData] = useState(null);

   

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let data = formData;
        if(!data)message.error('Please fill the Details');

        if(!data.passwordCurrent)message.error('Enter Your Current Password');
        else if(!data.password)message.error('Enter New Password');
        else if(!data.passwordConfirm)message.error('Enter Password Confirm');

        else dispatch(updateUserPassword(data));
      };
    
    return (
        <div className="a-right" >
          <form className="infoForm authForm" style={{width:'97%' ,height:'92vh'}}>
            <div style={{display:'flex' ,flexDirection:'column' ,marginBottom:'10%'}}>
            <h3 style={{marginBottom:'0px'}}>Update Your Password</h3>
            <span style={{ fontSize: "12px" ,marginTop:'0px'}}>
            Ready to Secure Your Account? Let's Strengthen Your Password!
              </span>
            </div>
    
            <div>
              <input
                type="text"
                placeholder="Current Password"
                className="infoInput"
                name="passwordCurrent"
                onChange={handleChange}
              />
            </div>
    
            <div>
              <input
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="passwordConfirm"
                onChange={handleChange}
              />
            </div>
    
            <div>
                
              <button className="button infoButton" onClick={handleSubmit}>Update</button>
            </div>
          </form>
        </div>
      );
    }

export default PasswordUpdateCard