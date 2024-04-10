import React, { useEffect, useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Social Space || Auth Page';
  }, []);
  const loading = useSelector((state)=>state.authReducer.loading)
  const initialState = {
    firstname: "",
    lastname: "",
    email:"",
    username: "",
    password: "",
    passwordConfirm: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  console.log(loading)
  
  const [data , setData] = useState(initialState)

  const resetForm = () => {
    setData(initialState);
    
  };
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(isSignUp){
      dispatch(signUp(data))
    }else{
      dispatch(login(data))
    }
   }

  return (
    <div className="Auth">
      {/* Left  side of the page with logo and text */}
      <div className="a-left" style={{cursor:'pointer'}} onClick={() => { window.location.href = '/auth' }}>
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Scape</h1>
          <h6>Welcome to Social Scape, where every idea fits right in!</h6>
        </div>
      </div>
      {/*  Right side of the page */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>

          {isSignUp &&
            <div>

              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                required
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                required
                value={data.lastname}
              />
            </div>
          }



          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              value={data.username}
            />
          </div>

          {
            isSignUp &&
            <div>
              <input
                type="email"
                className="infoInput"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                value={data.email}
              />
            </div>
          }


          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              value={data.password}
            />

            {isSignUp &&
              <input
                type="password"
                className="infoInput"
                name="passwordConfirm"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                value={data.passwordConfirm}
              />
            }

          </div>

          <div style={{display:'flex' ,flexDirection:'column', marginTop: '10px'}}>
            <span style={{ fontSize: '12px' }} >
              {isSignUp ? (
                <span>
                  Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {setIsSignUp(!isSignUp) ;resetForm()}}>Login !</span>
                </span>
              ) : (
                <span>
                  Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {setIsSignUp(!isSignUp);resetForm()}}>Signup !</span>
                </span>
              )}
            </span>

            <div>
            <span style={{ fontSize: '12px' }} >
             <span style={{color:'blue' , cursor:'pointer'}} onClick={() => { window.location.href = '/forgotPassword' }}>Forgot Password? </span>
               ||
             <span style={{color:'blue', cursor:'pointer'}} onClick={() => { window.location.href = '/forgotPassword' }}> Active Your Account?</span>
            </span>
            </div>
          </div>
          
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading? "Loading...": isSignUp ? "Signup" : "Login"}
            </button>
          
            
        </form>
      </div>

    </div>
  );
};

export default Auth;
